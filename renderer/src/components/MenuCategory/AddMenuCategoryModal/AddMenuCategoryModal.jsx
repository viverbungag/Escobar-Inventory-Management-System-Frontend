import React from 'react'
import styles from "./AddMenuCategoryModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Modal, Slide, Backdrop } from "@mui/material";


const AddMenuCategoryModal = ({name, isActiveAdd, nameOnChange, onClickAddButton, 
  openAddModal, handleCloseAddModal, handleIsActiveAddChange}) => {
  return (

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
        <div className={styles["add-menu-category-modal"]}>
          <div className={styles["add-menu-category-modal__content"]}>
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

              <FormControlLabel
                  checked={isActiveAdd}
                  onChange={handleIsActiveAddChange}
                  control={<Switch color="primary" />}
                  label="Active State"
                  labelPlacement="top"
              />
            </div>
            <ModalSaveButton label="Add Menu Category" onClick={onClickAddButton}/>
          </div>
        </div>
      </Slide>
  </Modal>

  )
}

export default AddMenuCategoryModal