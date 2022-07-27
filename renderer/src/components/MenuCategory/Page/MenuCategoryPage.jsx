import { useState, useEffect } from 'react';
import DataTable from "../../Shared/DataTable/DataTable";
import axios from 'axios';
import styles from "./MenuCategoryPage.module.scss";
import WindowControlBar from '../../../components/Shared/WindowControlBar/WindowControlBar';
import Navigation from "../../Shared/Navigation/Navigation";
import RowSelect from "../../Shared/RowSelect/RowSelect";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from '../../Shared/Buttons/InactivateButton/InactivateButton';
import { Modal, Slide, Backdrop } from "@mui/material";
import AddMenuCategoryModal from "../AddMenuCategoryModal/AddMenuCategoryModal";

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
    const [menuCategories, setMenuCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('Ascending');
    const [sortedBy, setSortedBy] = useState('None');
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [nameAdd, setNameAdd] = useState("");

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleNameAddChange = (event) => {
      setNameAdd(event.target.value);
    }

    const handleAddModalClicked = () => {
      addMenuCategory();
      setOpenModal(false);
      setNameAdd("")
    }

    const handlePageSizeChange = (event) => {
      setIsSelectAllChecked(false);
      setPageSize(parseInt(event.target.value, 10));
    };

    const handlePageNoChange = (event, newPageNo) => {
      setIsSelectAllChecked(false);
      setPageNo(newPageNo);
    }

    const handleSortedByChange= (event) => {
      setSortedBy(event.target.value);
    }

    const handleSortOrderChange = (event) => {
      setSortOrder(event.target.value);
    }

    const handleItemCheckboxChange = (item) => {
      const newMenuCategories = menuCategories.map((menuCategory)=>{
        if(menuCategory.menuCategoryId === item.menuCategoryId){
          menuCategory.isSelected = !menuCategory.isSelected;
        }
        return menuCategory;
      })

      setMenuCategories(newMenuCategories);
    }

    const handleSelectAllClick = () =>{
      const newMenuCategories = menuCategories.map((menuCategory)=>{
        menuCategory.isSelected = !isSelectAllChecked;
        return menuCategory;
      })

      setIsSelectAllChecked(!isSelectAllChecked);
      setMenuCategories(newMenuCategories);
    }

    const getAllMenuCategories = () => {

      axios.post("http://localhost:8080/api/v1/menu-category",
      {
        "pageNo": pageNo+1,
        "pageSize": pageSize,
        "sortedBy": sortedBy,
        "isAscending": sortOrder ==='Ascending' ? true:false
      }
    )
    .then(function (response) {
      setMenuCategories(response.data.contents
        .map(menuCategory => {
          return{
            ...menuCategory,
            isSelected:false
          }
        }));

      setTotalPages(response.data.totalCount);
    })
    }

    const addMenuCategory = () => {
      axios.post("http://localhost:8080/api/v1/menu-category/add",
      {
        "menuCategoryId": 1,
        "menuCategoryName": nameAdd,
        "active": true
      }
    )
    .then(function (response) {
      getAllMenuCategories();
    })
    }

    useEffect (()=>{
      getAllMenuCategories();
    }, [pageSize, pageNo, sortedBy, sortOrder])


  return (
    <div className={styles["menu-category-page"]}>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide 
            direction="down"
            in={openModal}
            mountOnEnter
            unmountOnExit 
            >
            <div className={styles["menu-category-page__modal"]}>
              <AddMenuCategoryModal name={nameAdd} nameOnChange={handleNameAddChange} onClickAddButton={handleAddModalClicked}/>
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
            <SaveButton label="Add Menu Category" onClick={handleOpenModal}/>
            <InactivateButton label="Inactivate"/>
          </section>
          <section className={styles["menu-category-page__main-bottom-section"]}>
            <DataTable 
              headers={headers}
              rows={menuCategories}
              sortOrder={sortOrder} 
              sortedBy={sortedBy} 
              pageNo={pageNo}
              pageSize={pageSize}
              totalPages={totalPages}
              sortItems={sortItems}
              handleItemCheckboxChange={handleItemCheckboxChange}
              isSelectAllChecked={isSelectAllChecked}
              handleSelectAllClick={handleSelectAllClick}
              handlePageNoChange={handlePageNoChange} 
              handlePageSizeChange={handlePageSizeChange}
              handleSortedByChange={handleSortedByChange}
              handleSortOrderChange={handleSortOrderChange}
            />
            </section>
        </section>
      </section>

    </div>
  )
}

export default MenuCategoryPage