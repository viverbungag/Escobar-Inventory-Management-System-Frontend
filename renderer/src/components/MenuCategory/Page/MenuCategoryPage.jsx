import { useState, useEffect } from 'react';
import DataTable from "../../Shared/DataTable/DataTable";
import axios from 'axios';
import styles from "./MenuCategoryPage.module.scss";
import WindowControlBar from '../../../components/Shared/WindowControlBar/WindowControlBar';
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from '../../Shared/Buttons/InactivateButton/InactivateButton';
import { Modal, Slide, Backdrop } from "@mui/material";
import AddMenuCategoryModal from "../AddMenuCategoryModal/AddMenuCategoryModal";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import InactiveMenuCategoryModal from "../InactiveMenuCategoryModal/InactiveMenuCategoryModal";
import EditMenuCategoryModal from "../EditMenuCategoryModal/EditMenuCategoryModal";

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

    const [activeSortOrder, setActiveSortOrder] = useState('Ascending');
    const [inactiveSortOrder, setInactiveSortOrder] = useState('Ascending');


    const [activeSortedBy, setActiveSortedBy] = useState('None');
    const [inactiveSortedBy, setInactiveSortedBy] = useState('None');

    const [activeIsSelectAllChecked, setActiveIsSelectAllChecked] = useState(false);
    const [inactiveIsSelectAllChecked, setInactiveIsSelectAllChecked] = useState(false);
    
    const [activePageNo, setActivePageNo] = useState(0);
    const [inactivePageNo, setInactivePageNo] = useState(0);

    const [activePageSize, setActivePageSize] = useState(10);
    const [inactivePageSize, setInactivePageSize] = useState(10);

    const [activeTotalPages, setActiveTotalPages] = useState(0);
    const [inactiveTotalPages, setInactiveTotalPages] = useState(0);

    const [selectedActiveItemsCount, setSelectedActiveItemsCount] = useState(0);
    const [selectedInactiveItemsCount, setSelectedInactiveItemsCount] = useState(0);

    const [nameAdd, setNameAdd] = useState("");

    const [nameEdit, setNameEdit] = useState("");
    const [isActiveEdit, setIsActiveEdit] = useState(true);

    const [selectedEditItem, setSelectedEditItem] = useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewInactiveModal, setOpenViewInactiveModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);
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

    const handleNameAddChange = (event) => {
      setNameAdd(event.target.value);
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
      setNameAdd("")
    }

    const handleActivePageSizeChange = (event) => {
      setActiveIsSelectAllChecked(false);
      setActivePageSize(parseInt(event.target.value, 10));
    };

    const handleInactivePageSizeChange = (event) => {
      setInactiveIsSelectAllChecked(false);
      setInactivePageSize(parseInt(event.target.value, 10));
    };

    const handleActivePageNoChange = (event, newPageNo) => {
      setActiveIsSelectAllChecked(false);
      setActivePageNo(newPageNo);
    }

    const handleInactivePageNoChange = (event, newPageNo) => {
      setInactiveIsSelectAllChecked(false);
      setInactivePageNo(newPageNo);
    }

    const handleActiveSortedByChange= (event) => {
      setActiveSortedBy(event.target.value);
    }

    const handleInactiveSortedByChange= (event) => {
      setInactiveSortedBy(event.target.value);
    }

    const handleActiveSortOrderChange = (event) => {
      setActiveSortOrder(event.target.value);
    }

    const handleInactiveSortOrderChange = (event) => {
      setInactiveSortOrder(event.target.value);
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

      setSelectedInactiveItemsCount(selectedItemsCount);
      setInactiveMenuCategories(newMenuCategories);
    }

    const handleActiveSelectAllClick = () =>{
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

    const handleInactiveSelectAllClick = () =>{
      let selectedItemsCount = 0;
      const newMenuCategories = inactiveMenuCategories.map((menuCategory)=>{
        menuCategory.isSelected = !inactiveIsSelectAllChecked;

        if ((selectedInactiveItemsCount > 0 
          && selectedInactiveItemsCount < inactiveMenuCategories.length)
          || selectedInactiveItemsCount === 0){
          menuCategory.isSelected = true;
        }else{
          menuCategory.isSelected= false
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
    }

    const getAllActiveMenuCategories = () => {

      axios.post("http://localhost:8080/api/v1/menu-category/active",
      {
        "pageNo": activePageNo+1,
        "pageSize": activePageSize,
        "sortedBy": activeSortedBy,
        "isAscending": activeSortOrder ==='Ascending' ? true:false
      }
    )
    .then(function (response) {
      setActiveMenuCategories(response.data.contents
        .map(menuCategory => {
          return{
            ...menuCategory,
            isSelected:false
          }
        }));
      setActiveTotalPages(response.data.totalCount);
    })
    }

    const getAllInactiveMenuCategories = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/inactive",
      {
        "pageNo": inactivePageNo+1,
        "pageSize": inactivePageSize,
        "sortedBy": inactiveSortedBy,
        "isAscending": inactiveSortOrder ==='Ascending' ? true:false
      }
    )
    .then(function (response) {
      setInactiveMenuCategories(response.data.contents
        .map(menuCategory => {
          return{
            ...menuCategory,
            isSelected:false
          }
        }));
      setInactiveTotalPages(response.data.totalCount);
    })
    }

    const addMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/add",
      {
        "menuCategoryId": 1,
        "menuCategoryName": nameAdd,
        "isActive": true
      }
    )
    .then(function (response) {
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    })
    }

    const updateMenuCategory = () => {
      console.log("heloww");

      axios.put(`http://localhost:8080/api/v1/menu-category/update/${selectedEditItem.menuCategoryId}`,
      {
        "menuCategoryId": selectedEditItem.menuCategoryId,
        "menuCategoryName": nameEdit,
        "isActive": isActiveEdit
      }
    )
    .then(function (response) {
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    })
    }

    const handleActivateClick= () => {
      activateMenuCategory();
      setInactiveIsSelectAllChecked(false);
      setSelectedInactiveItemsCount(0);
    }

    const handleInactivateClick= () => {
      inactivateMenuCategory();
      setActiveIsSelectAllChecked(false);
      setSelectedActiveItemsCount(0);
    }

    const activateMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/activate",
      {
        "menuCategoryListDto": inactiveMenuCategories.filter((menuCategories) => menuCategories.isSelected)
      }
    )
    .then(function (response) {
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    })
    }

    const inactivateMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/inactivate",
      {
        "menuCategoryListDto": activeMenuCategories.filter((menuCategories) => menuCategories.isSelected)
      }
    )
    .then(function (response) {
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    })
    }

    useEffect (()=>{
      getAllActiveMenuCategories();
      getAllInactiveMenuCategories();
    }, [activePageSize, activePageNo, activeSortedBy, activeSortOrder, 
      inactivePageSize, inactivePageNo, inactiveSortedBy, inactiveSortOrder])


  return (
    <div className={styles["menu-category-page"]}>

        <Modal
          open={openAddModal}
          onClose={handleCloseAddModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide 
            direction="down"
            in={openAddModal}
            mountOnEnter
            unmountOnExit 
            >
            <div className={styles["menu-category-page__add-modal"]}>
              <AddMenuCategoryModal name={nameAdd} nameOnChange={handleNameAddChange} onClickAddButton={handleAddModalButtonClicked}/>
            </div>
          </Slide>
        </Modal>

        <Modal
          open={openViewInactiveModal}
          onClose={handleCloseViewInactiveModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide 
            direction="down"
            in={openViewInactiveModal}
            mountOnEnter
            unmountOnExit 
            >
            <div className={styles["menu-category-page__view-inactive-modal"]}>
              <InactiveMenuCategoryModal 
                headers={headers}
                rows={inactiveMenuCategories}
                sortOrder={inactiveSortOrder} 
                sortedBy={inactiveSortedBy} 
                pageNo={inactivePageNo}
                pageSize={inactivePageSize}
                totalPages={inactiveTotalPages}
                sortItems={sortItems}
                tableState="active"
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
              />
            </div>
          </Slide>
        </Modal>
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide 
            direction="down"
            in={openEditModal}
            mountOnEnter
            unmountOnExit 
            >
            <div className={styles["menu-category-page__edit-modal"]}>
              <EditMenuCategoryModal
                selectedEditItem={selectedEditItem} 
                nameEdit={nameEdit}
                isActiveEdit={isActiveEdit}
                handleNameEditChange={handleNameEditChange}
                handleIsActiveEditChange={handleIsActiveEditChange}
                handleEditModalButtonClicked={handleEditModalButtonClicked}
              />
            </div>
          </Slide>
        </Modal>


      <section className={styles["menu-category-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["menu-category-page__lower-section"]}>
        <Navigation />
        <section className={styles["menu-category-page__main-section"]}>
          <section className={styles["menu-category-page__main-top-section"]}>
            <InactivateButton label="Inactivate" onClick={handleInactivateClick}/>
            <SaveButton label="Add Menu Category" onClick={handleOpenAddModal}/>
          </section>
          <section className={styles["menu-category-page__main-bottom-section"]}>
            <DataTable 
              headers={headers}
              rows={activeMenuCategories}
              sortOrder={activeSortOrder} 
              sortedBy={activeSortedBy} 
              pageNo={activePageNo}
              pageSize={activePageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
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