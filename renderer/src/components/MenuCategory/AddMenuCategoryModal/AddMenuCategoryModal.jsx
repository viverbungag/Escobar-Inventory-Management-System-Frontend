import React from 'react'
import styles from "./AddMenuCategoryModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from '@mui/material/TextField';


const AddMenuCategoryModal = ({name, nameOnChange, onClickAddButton}) => {
  return (
    <div className={styles["add-menu-category-modal"]}>
        <div className={styles["add-menu-category-modal__title"]}>Add Your Menu Category</div>
        <div className={styles["add-menu-category-modal__text-field"]}>
        <TextField 
        id="filled-basic" 
        label={<span className={styles["add-menu-category-modal__text-placeholder"]}>Input name here</span>}
        variant="standard"
        fullWidth 
        value={name}
        onChange={nameOnChange}
        />
        </div>
        <ModalSaveButton label="Add Menu Category" onClick={onClickAddButton}/>
    </div>
  )
}

export default AddMenuCategoryModal