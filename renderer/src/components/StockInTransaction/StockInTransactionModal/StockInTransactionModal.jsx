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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const StockInTransactionModal = ({
  allSupplies,
  allSuppliers,
  transactBy,
  transactionDate,
  quantity,
  unitOfMeasurement,
  pricePerUnit,
  expiryDate,
  transactionDateOnChange,
  quantityOnChange,
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
                value={minimumQuantity}
                onChange={minimumQuantityOnChange}
              />
              <ItemsSelect
                label="Supply Category"
                items={allSupplyCategories}
                selectedItem={supplyCategory}
                itemOnChange={supplyCategoryOnChange}
              />

              <ItemsSelect
                label="Unit of Measurement"
                items={allSuppliers}
                selectedItem={unitOfMeasurement}
                itemOnChange={unitOfMeasurementOnChange}
              />
              <ItemsSelect
                label="Supplier"
                items={allSupplies}
                selectedItem={supplier}
                itemOnChange={supplierOnChange}
              />
              <FormControlLabel
                checked={isActive}
                onChange={isActiveOnChange}
                control={<Switch color="primary" />}
                label={
                  <span className={styles["add-supply-modal__text"]}>
                    Active State
                  </span>
                }
                labelPlacement="top"
              />
            </div>
            <ModalSaveButton label="Add Supply" onClick={onClickAddButton} />
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default StockInTransactionModal;
