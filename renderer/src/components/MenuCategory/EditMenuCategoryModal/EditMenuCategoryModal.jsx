import React from 'react';
import styles from "./EditMenuCategoryModal.module.scss";
import ModalSaveButton from 'src/components/Shared/Buttons/ModalSaveButton/ModalSaveButton';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const EditMenuCategoryModal = ({selectedEditItem, nameEdit, isActiveEdit, 
    handleNameEditChange, handleIsActiveEditChange, handleEditModalButtonClicked}) => {
  return (
    <div className={styles["edit-menu-category-modal"]}>
        <div className={styles["edit-menu-category-modal__title"]}>Edit Your Menu Category</div>
        <div className={styles["edit-menu-category-modal__body"]}>
            <div>
                Menu Category ID: <span>{selectedEditItem.menuCategoryId}</span>
            </div>

            <div className={styles["edit-menu-category-modal__text-field"]}>
                <TextField 
                    id="filled-basic" 
                    label={
                    <span className={styles["add-menu-category-modal__text-placeholder"]}>
                        Menu Category Name</span>}
                    variant="standard"
                    fullWidth 
                    value={nameEdit}
                    onChange={handleNameEditChange}
                />

                <FormControlLabel
                    checked={isActiveEdit}
                    onChange={handleIsActiveEditChange}
                    control={<Switch color="primary" />}
                    label="Active State"
                    labelPlacement="top"
                />
            </div>
        </div>
        <div className={styles["edit-menu-category-modal__save-button"]}>
            <ModalSaveButton label="Save" onClick={handleEditModalButtonClicked}/>
        </div>
        
    </div>
  )
}

export default EditMenuCategoryModal