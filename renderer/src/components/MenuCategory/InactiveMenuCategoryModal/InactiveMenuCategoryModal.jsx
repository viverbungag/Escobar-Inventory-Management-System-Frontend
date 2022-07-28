import React from 'react';
import styles from "./InactiveMenuCategoryModal.module.scss";
import DataTable from "../../Shared/DataTable/DataTable";
import ActivateButton from "../../Shared/Buttons/ActivateButton/ActivateButton";

const InactiveMenuCategoryModal = ({headers, rows, 
    sortOrder, sortedBy, pageNo, sortItems, 
    pageSize, totalPages, handleItemCheckboxChange,
    isSelectAllChecked, handleSelectAllClick, 
    handlePageNoChange, handlePageSizeChange,
    handleSortedByChange, handleSortOrderChange,
    handleActivateClick, handleOpenEditModal, 
    selectedItemsCount}) => {
  return (
    <div className={styles["inactive-menu-category-modal"]}>
        <DataTable 
              headers={headers}
              rows={rows}
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
              handleOpenEditModal={handleOpenEditModal}
              selectedItemsCount={selectedItemsCount}
              tableState="inactive"
            />
            <ActivateButton label="Activate" onClick={handleActivateClick}/>
    </div>
  )
}

export default InactiveMenuCategoryModal