import { useState, useEffect } from 'react';
import DataTable from "../../Shared/DataTable/DataTable";
import axios from 'axios';
import styles from "./MenuCategoryPage.module.scss";
import WindowControlBar from '../../../components/Shared/WindowControlBar/WindowControlBar';
import Navigation from "../../Shared/Navigation/Navigation";
import RowSelect from "../../Shared/RowSelect/RowSelect";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from '../../Shared/Buttons/InactivateButton/InactivateButton';
import { TablePagination } from '@mui/material';

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

const MenuCategoryPage = () => {
    const [menuCategories, setMenuCategories] = useState([]);
    const [isAscending, setIsAscending] = useState(true);
    const [sortedBy, setSortedBy] = useState('none');
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageSizeChange = (event) => {
      setIsSelectAllChecked(false);
      setPageSize(parseInt(event.target.value, 10));
    };

    const handlePageNoChange = (event, newPageNo) =>{
      setIsSelectAllChecked(false);
      setPageNo(newPageNo);
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
        "isAscending": isAscending
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

    useEffect (()=>{
      getAllMenuCategories();
    }, [pageSize, pageNo])


  return (
    <div className={styles["menu-category-page"]}>
      <section className={styles["menu-category-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["menu-category-page__lower-section"]}>
        <Navigation />
        <section className={styles["menu-category-page__main-section"]}>
          <section className={styles["menu-category-page__main-top-section"]}>
            <SaveButton label="Add Menu Category"/>
            <InactivateButton label="Inactivate"/>
          </section>
          <section className={styles["menu-category-page__main-bottom-section"]}>
            <DataTable 
              headers={headers}
              rows={menuCategories}
              isAscending={isAscending} 
              sortedBy={sortedBy} 
              pageNo={pageNo}
              pageSize={pageSize}
              totalPages={totalPages}
              handleItemCheckboxChange={handleItemCheckboxChange}
              isSelectAllChecked={isSelectAllChecked}
              handleSelectAllClick={handleSelectAllClick}
              handlePageNoChange={handlePageNoChange} 
              handlePageSizeChange={handlePageSizeChange}
            />
            </section>
        </section>
      </section>

    </div>
  )
}

export default MenuCategoryPage