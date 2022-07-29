import { useState, useEffect } from 'react';
import DataTable from "../../Shared/DataTable/DataTable";
import axios from 'axios';
import styles from "./MenuCategoryPage.module.scss";
import WindowControlBar from '../../../components/Shared/WindowControlBar/WindowControlBar';
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from '../../Shared/Buttons/InactivateButton/InactivateButton';
import AddMenuCategoryModal from "../AddMenuCategoryModal/AddMenuCategoryModal";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import InactiveMenuCategoryModal from "../InactiveMenuCategoryModal/InactiveMenuCategoryModal";
import EditMenuCategoryModal from "../EditMenuCategoryModal/EditMenuCategoryModal";
import { toast } from 'react-toastify';
import Toast from "../../Shared/Toast/Toast";
import Pagination from 'src/model/Pagination';
import { getWithPagination } from "../../../rest/rest";
import MenuCategory from 'src/model/MenuCategory';

const headers = [
  {
    id: 'id',
    label: 'Id',
    value: 'menuCategoryId'
  },
  {
    id: 'name',
    label: 'Name',
    value: 'menuCategoryName'
  }
];

const sortItems = [
  {
    label: "Name"
  }
]

const MenuCategoryPage = () => {
    const [activeMenuCategories, setActiveMenuCategories] = useState([]);
    const [inactiveMenuCategories, setInactiveMenuCategories] = useState([]);

    const [activeIsSelectAllChecked, setActiveIsSelectAllChecked] = useState(false);
    const [inactiveIsSelectAllChecked, setInactiveIsSelectAllChecked] = useState(false);
    
    const [activePagination, setActivePagination] = useState(new Pagination(0, 10, 'None', true));
    const [inactivePagination, setInactivePagination] = useState(new Pagination(0, 10, 'None', true));

    const [activeTotalPages, setActiveTotalPages] = useState(0);
    const [inactiveTotalPages, setInactiveTotalPages] = useState(0);

    const [selectedActiveItemsCount, setSelectedActiveItemsCount] = useState(0);
    const [selectedInactiveItemsCount, setSelectedInactiveItemsCount] = useState(0);

    const [nameAdd, setNameAdd] = useState("");
    const [isActiveAdd, setIsActiveAdd] = useState(true);
    const [addedMenuCategory, setAddedMenuCategory] = useState(new MenuCategory(1, "", true));

    const [nameEdit, setNameEdit] = useState("");
    const [isActiveEdit, setIsActiveEdit] = useState(true);

    const [selectedEditItem, setSelectedEditItem] = useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewInactiveModal, setOpenViewInactiveModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenAddModal = () => {
      setNameAdd("");
      setIsActiveAdd(true);
      setOpenAddModal(true);
    };
    const handleCloseAddModal = () => {
      setOpenAddModal(false);
    };
    const handleOpenViewInactiveModal = () => setOpenViewInactiveModal(true);
    const handleCloseViewInactiveModal = () => setOpenViewInactiveModal(false);
    const handleOpenEditModal = (row, tableState) => {
      if(tableState === "active"){
        handleActiveItemCheckboxChange(row);
      }

      if(tableState === "inactive"){
        handleInactiveItemCheckboxChange(row);
      }
      
      setNameEdit(row.menuCategoryName);
      setIsActiveEdit(row.isActive);
      setSelectedEditItem(row);
      setOpenEditModal(true);
    };
    const handleCloseEditModal = () => setOpenEditModal(false);

    const resetToDefault = () => {
      setActiveIsSelectAllChecked(false);
      setSelectedActiveItemsCount(0);
      setInactiveIsSelectAllChecked(false);
      setSelectedInactiveItemsCount(0);
    }

    const handleNameAddChange = (event) => {
      setNameAdd(event.target.value);
    }

    const handleIsActiveAddChange = (event) => {
      setIsActiveAdd(!isActiveAdd);
    }

    const handleNameEditChange = (event) => {
      setNameEdit(event.target.value);
    }

    const handleIsActiveEditChange = (event) => {
      setIsActiveEdit(!isActiveEdit);
    }

    const handleAddModalButtonClicked = () => {
      addMenuCategory();
      setOpenAddModal(false);
      setNameAdd("");
      resetToDefault();
    }

    const handleActivePageSizeChange = (event) => {
      setActivePagination(new Pagination (
        activePagination.pageNo,
        parseInt(event.target.value, 10),
        activePagination.sortedBy,
        activePagination.isAscending));
      resetToDefault();
    };

    const handleInactivePageSizeChange = (event) => {
      setInactivePagination(new Pagination (
        inactivePagination.pageNo,
        parseInt(event.target.value, 10),
        inactivePagination.sortedBy,
        inactivePagination.isAscending));
      resetToDefault();
    };

    const handleActivePageNoChange = (event, newPageNo) => {
      setActivePagination(new Pagination(
        newPageNo,
        activePagination.pageSize,
        activePagination.sortedBy,
        activePagination.isAscending));
      resetToDefault();
    }

    const handleInactivePageNoChange = (event, newPageNo) => {
      setInactivePagination(new Pagination(
        newPageNo,
        inactivePagination.pageSize,
        inactivePagination.sortedBy,
        inactivePagination.isAscending));
      resetToDefault();
    }

    const handleActiveSortedByChange= (event) => {
      setActivePagination(new Pagination(
        activePagination.pageNo,
        activePagination.pageSize,
        event.target.value,
        activePagination.isAscending));
      resetToDefault();
    }

    const handleInactiveSortedByChange= (event) => {
      setInactivePagination(new Pagination(
        inactivePagination.pageNo,
        inactivePagination.pageSize,
        event.target.value,
        inactivePagination.isAscending));
      resetToDefault();
    }

    const handleActiveSortOrderChange = (event) => {
      setActivePagination(new Pagination(
        activePagination.pageNo, 
        activePagination.pageSize, 
        activePagination.sortedBy, 
        event.target.value === "Ascending" ? true:false));
      resetToDefault();
    }

    const handleInactiveSortOrderChange = (event) => {
      setInactivePagination(new Pagination(
        inactivePagination.pageNo, 
        inactivePagination.pageSize, 
        inactivePagination.sortedBy, 
        event.target.value === "Ascending" ? true:false));
      resetToDefault();
    }

    const handleActiveItemCheckboxChange = (item) => {
      let selectedItemsCount = 0;
      const newMenuCategories = activeMenuCategories.map((menuCategory)=>{
        if(menuCategory.menuCategoryId === item.menuCategoryId){
          menuCategory.isSelected = !menuCategory.isSelected;
        }

        if (menuCategory.isSelected){
          selectedItemsCount++;
        }
        return menuCategory;
      })

      if (selectedItemsCount === activeMenuCategories.length){
        setActiveIsSelectAllChecked(true);
      }
      
      if (selectedItemsCount === 0){
        setActiveIsSelectAllChecked(false);
      }

      setSelectedActiveItemsCount(selectedItemsCount);
      setActiveMenuCategories(newMenuCategories);
    }

    const handleInactiveItemCheckboxChange = (item) => {
      let selectedItemsCount = 0;
      const newMenuCategories = inactiveMenuCategories.map((menuCategory)=>{

        if(menuCategory.menuCategoryId === item.menuCategoryId){
            menuCategory.isSelected = !menuCategory.isSelected;
        }

        if (menuCategory.isSelected){
          selectedItemsCount++;
        }
        return menuCategory;
      })

      if (selectedItemsCount === inactiveMenuCategories.length){
        setInactiveIsSelectAllChecked(true);
      }
      
      if (selectedItemsCount === 0){
        setInactiveIsSelectAllChecked(false);
      }

      setSelectedInactiveItemsCount(selectedItemsCount);
      setInactiveMenuCategories(newMenuCategories);
    }

    const handleActiveSelectAllClick = () => {
      let selectedItemsCount = 0;
      const newMenuCategories = activeMenuCategories.map((menuCategory)=>{

        if ((selectedActiveItemsCount > 0 
          && selectedActiveItemsCount < activeMenuCategories.length)
          || selectedActiveItemsCount === 0){
          menuCategory.isSelected = true;
        }else{
          menuCategory.isSelected= false
        }

        if (menuCategory.isSelected){
          selectedItemsCount++;
        }

        return menuCategory;
      })

      setSelectedActiveItemsCount(selectedItemsCount);

      if (activeMenuCategories.length > 0 && selectedActiveItemsCount === activeMenuCategories.length){
        setActiveIsSelectAllChecked(false);
      }else{
        setActiveIsSelectAllChecked(true);
      }

      setActiveMenuCategories(newMenuCategories);
    }

    const handleInactiveSelectAllClick = () => {
      let selectedItemsCount = 0;
      const newMenuCategories = inactiveMenuCategories.map((menuCategory)=>{

        if ((selectedInactiveItemsCount > 0 
          && selectedInactiveItemsCount < inactiveMenuCategories.length)
          || selectedInactiveItemsCount === 0){
          menuCategory.isSelected = true;
        }else{
          menuCategory.isSelected= false;
        }

        if (menuCategory.isSelected){
          selectedItemsCount++;
        }

        return menuCategory;
      })

      setSelectedInactiveItemsCount(selectedItemsCount);

      if (inactiveMenuCategories.length > 0 && selectedInactiveItemsCount === inactiveMenuCategories.length){
        setInactiveIsSelectAllChecked(false);
      }else{
        setInactiveIsSelectAllChecked(true);
      }

      setInactiveMenuCategories(newMenuCategories);
    }

    const handleEditModalButtonClicked = () => {
      updateMenuCategory();
      setOpenEditModal(false);
      resetToDefault();
    }

    const handleActiveMenuCategoriesLoad = (contents) =>{
      setActiveMenuCategories(contents
        .map(menuCategory => {
          return{
            ...menuCategory,
            isSelected:false
          }
        }));
    }

    const handleActiveTotalPagesLoad = (data) => {
      setActiveTotalPages(data);
    }

    const getAllActiveMenuCategories = () => {
      getWithPagination(
        "http://localhost:8080/api/v1/menu-category/active",
        activePagination.tojson(),
        handleActiveMenuCategoriesLoad,
        handleActiveTotalPagesLoad
      )
    }

    const handleInactiveMenuCategoriesLoad = (contents) =>{
      setInactiveMenuCategories(contents
        .map(menuCategory => {
          return{
            ...menuCategory,
            isSelected:false
          }
        }));
    }

    const handleInactiveTotalPagesLoad = (data) => {
      setInactiveTotalPages(data);
    }

    const getAllInactiveMenuCategories = () => {
      getWithPagination(
        "http://localhost:8080/api/v1/menu-category/inactive",
        inactivePagination.tojson(),
        handleInactiveMenuCategoriesLoad,
        handleInactiveTotalPagesLoad
      )
    }

    const addMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/add",
      {
        "menuCategoryId": 1,
        "menuCategoryName": nameAdd,
        "isActive": isActiveAdd
      }
    )
    .then(function (response) {
      if (response.status === 200){
        getAllActiveMenuCategories();
        getAllInactiveMenuCategories();
        toast.success(`Successully added ${nameAdd}`);
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
    }

    const updateMenuCategory = () => {
      axios.put(`http://localhost:8080/api/v1/menu-category/update/${selectedEditItem.menuCategoryId}`,
      {
        "menuCategoryId": selectedEditItem.menuCategoryId,
        "menuCategoryName": nameEdit,
        "isActive": isActiveEdit
      }
    )
    .then(function (response) {
      if (response.status === 200){
        getAllActiveMenuCategories();
        getAllInactiveMenuCategories();
        toast.success(`Successully updated Menu Category ${selectedEditItem.menuCategoryId}`);
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
    }

    const handleActivateClick= () => {
      activateMenuCategory();
      resetToDefault();
    }

    const handleInactivateClick= () => {
      inactivateMenuCategory();
      resetToDefault();
    }

    const activateMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/activate",
      {
        "menuCategoryListDto": inactiveMenuCategories.filter((menuCategories) => menuCategories.isSelected)
      }
    )
    .then(function (response) {
      if(response.status === 200) {
        getAllInactiveMenuCategories();
        getAllActiveMenuCategories();
        
        toast.success(`Successully activated the selected Menu Categories`);
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
    }

    const inactivateMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/inactivate",
      {
        "menuCategoryListDto": activeMenuCategories.filter((menuCategories) => menuCategories.isSelected)
      }
    )
    .then(function (response) {
      if (response.status === 200) {

        if (selectedActiveItemsCount === activeMenuCategories.length) {
          console.log("inactivate selected all");
          setActivePageNo(-1);
        }

        getAllActiveMenuCategories();
        getAllInactiveMenuCategories();
        toast.success(`Successully inactivated the selected Menu Categories`);
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
    }

    useEffect (()=>{
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    }, [activePagination, inactivePagination])


  return (
    <div className={styles["menu-category-page"]}>
      <Toast />
      <AddMenuCategoryModal 
        name={nameAdd}
        isActiveAdd={isActiveAdd}
        nameOnChange={handleNameAddChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleIsActiveAddChange={handleIsActiveAddChange}
      />
      <InactiveMenuCategoryModal 
        headers={headers}
        rows={inactiveMenuCategories}
        sortOrder={inactivePagination.isAscending ? "Ascending":"Descending"}
        sortedBy={inactivePagination.sortedBy}
        pageNo={inactivePagination.pageNo}
        pageSize={inactivePagination.pageSize}
        totalPages={inactiveTotalPages}
        sortItems={sortItems}
        handleItemCheckboxChange={handleInactiveItemCheckboxChange}
        isSelectAllChecked={inactiveIsSelectAllChecked}
        handleSelectAllClick={handleInactiveSelectAllClick}
        handlePageNoChange={handleInactivePageNoChange} 
        handlePageSizeChange={handleInactivePageSizeChange}
        handleSortedByChange={handleInactiveSortedByChange}
        handleSortOrderChange={handleInactiveSortOrderChange}
        handleActivateClick={handleActivateClick}
        handleOpenEditModal={handleOpenEditModal}
        selectedItemsCount={selectedInactiveItemsCount}
        openViewInactiveModal={openViewInactiveModal}
        handleCloseViewInactiveModal={handleCloseViewInactiveModal}
      />

      <EditMenuCategoryModal
        selectedEditItem={selectedEditItem} 
        nameEdit={nameEdit}
        isActiveEdit={isActiveEdit}
        handleNameEditChange={handleNameEditChange}
        handleIsActiveEditChange={handleIsActiveEditChange}
        handleEditModalButtonClicked={handleEditModalButtonClicked}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
      />


      <section className={styles["menu-category-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["menu-category-page__lower-section"]}>
        <Navigation />
        <section className={styles["menu-category-page__main-section"]}>
          <section className={styles["menu-category-page__main-top-section"]}>
            <InactivateButton label="Inactivate" onClick={handleInactivateClick} disableCondition={selectedActiveItemsCount <= 0}/>
            <SaveButton label="Add Menu Category" onClick={handleOpenAddModal}/>
          </section>
          <section className={styles["menu-category-page__main-bottom-section"]}>
            <DataTable 
              headers={headers}
              rows={activeMenuCategories}
              sortOrder={activePagination.isAscending ? "Ascending":"Descending"}
              sortedBy={activePagination.sortedBy}
              pageNo={activePagination.pageNo}
              pageSize={activePagination.pageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
              tableState="active"
              isSelectAllChecked={activeIsSelectAllChecked}
              handleItemCheckboxChange={handleActiveItemCheckboxChange}
              handleSelectAllClick={handleActiveSelectAllClick}
              handlePageNoChange={handleActivePageNoChange} 
              handlePageSizeChange={handleActivePageSizeChange}
              handleSortedByChange={handleActiveSortedByChange}
              handleSortOrderChange={handleActiveSortOrderChange}
              handleOpenEditModal={handleOpenEditModal}
              selectedItemsCount={selectedActiveItemsCount}
            />
            <div className={styles["menu-category-page__view-inactive-items-buton"]}>
              <InactiveItemsButton label="View Inactive Menu Categories" onClick={handleOpenViewInactiveModal}/>
            </div>
            </section>
        </section>
      </section>
    </div>
  )
}

export default MenuCategoryPage