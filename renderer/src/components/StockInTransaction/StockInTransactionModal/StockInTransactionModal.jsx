import React from "react";
import styles from "./StockInTransactionModal.module.scss";
import ModalSaveButton from "../../Shared/Buttons/ModalSaveButton/ModalSaveButton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Modal, Slide, Backdrop } from "@mui/material";
import ItemsSelect from "../../Shared/ItemsSelect/ItemsSelect";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputAdornment from '@mui/material/InputAdornment';

const StockInTransactionModal = ({
  allSupplies,
  allSuppliers,
  supply,
  supplier,
  transactBy,
  transactionDate,
  quantity,
  unitOfMeasurement,
  pricePerUnit,
  expiryDate,
  supplyOnChange,
  supplierOnChange,
  transactionDateOnChange,
  quantityOnChange,
  pricePerUnitOnChange,
  expiryDateOnChange,
  onClickAddButton,
}) => {
  return (
    <Modal
      open={true}
      onClose={() => {}}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <div className={styles["add-supply-modal"]}>
          <div className={styles["add-supply-modal__content"]}>
            <div className={styles["add-supply-modal__title"]}>Stock-In</div>
            <div className={styles["add-supply-modal__text-field"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Transaction Date"
                  inputFormat="MM/dd/yyyy"
                  value={transactionDate}
                  onChange={transactionDateOnChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Expiry Date"
                  inputFormat="MM/dd/yyyy"
                  value={expiryDate}
                  onChange={expiryDateOnChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                id="filled-basic"
                type="number"
                label={
                  <span className={styles["add-supply-modal__text"]}>
                    Input Quantity here
                  </span>
                }
                variant="standard"
                fullWidth
                value={quantity}
                onChange={quantityOnChange}
                InputProps={{
                  startAdornment: <InputAdornment position="end">{unitOfMeasurement}</InputAdornment>,
                }}
              />
              <TextField
                id="filled-basic"
                type="number"
                label={
                  <span className={styles["add-supply-modal__text"]}>
                    Input Price per Unit
                  </span>
                }
                variant="standard"
                fullWidth
                value={pricePerUnit}
                onChange={pricePerUnitOnChange}
              />
              <ItemsSelect
                label="Supply"
                items={allSupplies}
                selectedItem={supply}
                itemOnChange={supplyOnChange}
              />
              <ItemsSelect
                label="Supplier"
                items={allSuppliers}
                selectedItem={supplier}
                itemOnChange={supplierOnChange}
              />
            </div>
            <ModalSaveButton label="Stock-in" onClick={onClickAddButton} />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default StockInTransactionModal;
