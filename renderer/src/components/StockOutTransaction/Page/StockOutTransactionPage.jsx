import React, { useState, useEffect } from "react";
import DataTable from "../../Shared/DataTable/DataTable";
import styles from "./StockOutTransactionPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import SaveButton from "../../Shared/Buttons/SaveButton/SaveButton";
import InactivateButton from "../../Shared/Buttons/InactivateButton/InactivateButton";
import InactiveItemsButton from "../../Shared/Buttons/InactiveItemsButton/InactiveItemsButton";
import AddStockOutTransactionModal from "../AddStockOutTransactionModal/AddStockOutTransactionModal";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import Transaction from "../../../model/Transaction";
import StockOutSupplyTable from "../StockOutSupplyTable/StockOutSupplyTable";

const INITIAL_URL = "http://localhost:8080/api/v1";

const headers = [
  {
    id: "id",
    label: "Id",
    value: "supplyId",
  },
  {
    id: "name",
    label: "Name",
    value: "supplyName",
  },
  {
    id: "quantity",
    label: "Quantity",
    value: "supplyQuantity",
  },
  {
    id: "minimumQuantity",
    label: "Minimum Quantity",
    value: "minimumQuantity",
  },
  {
    id: "supplier",
    label: "Supplier",
    value: "supplierName",
  },
  {
    id: "unitOfMeasurement",
    label: "Unit of Measurement",
    value: "unitOfMeasurementName",
  },
  {
    id: "supplyCategory",
    label: "Supply Category",
    value: "supplyCategoryName",
  },
];

const sortItems = [
  {
    label: "Name",
  },
  {
    label: "Quantity",
  },
  {
    label: "Minimum Quantity",
  },
  {
    label: "Supplier",
  },
  {
    label: "Unit of Measurement",
  },
  {
    label: "Supply Category",
  },
];

const StockOutTransactionPage = () => {
  const currentDate = new Date();
  const defaultExpirationDate = new Date(currentDate.getTime());
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);

  const currentUser = "Bungag, Viver";

  const [activeSupplies, setActiveSupplies] = useState([]);

  const [activePagination, setActivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );
  const [inactivePagination, setInactivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );

  const [activeTotalPages, setActiveTotalPages] = useState(0);
  const [inactiveTotalPages, setInactiveTotalPages] = useState(0);

  const [selectedActiveItemsCount, setSelectedActiveItemsCount] = useState(0);
  const [selectedInactiveItemsCount, setSelectedInactiveItemsCount] =
    useState(0);

  const [addTransaction, setAddTransaction] = useState(
    new Transaction(
      1,
      currentUser,
      currentDate,
      "",
      1,
      "",
      "",
      1,
      defaultExpirationDate,
      "STOCK_OUT"
    )
  );

  const [openStockOutModal, setOpenStockOutModal] = useState(false);

  const rest = new Rest();

  const handleOpenStockOutModal = (supply) => {
    setAddTransaction(
      new Transaction(
        1,
        currentUser,
        currentDate,
        supply.supplierName,
        1,
        supply.supplyName,
        supply.unitOfMeasurementName,
        1,
        defaultExpirationDate,
        "STOCK_OUT"
      )
    );

    setOpenStockOutModal(true);
  };
  const handleCloseAddModal = () => {
    setOpenStockOutModal(false);
  };

  const handleQuantityStockOutChange = (event) => {
    setAddTransaction(
      new Transaction(
        1,
        currentUser,
        currentDate,
        addTransaction.supplierName,
        event.target.value,
        addTransaction.supplyName,
        addTransaction.unitOfMeasurementAbbreviation,
        0,
        defaultExpirationDate,
        "STOCK_OUT"
      )
    );
  };

  const handleAddModalButtonClicked = () => {
    stockOut();
  };

  const handleActivePageSizeChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        parseInt(event.target.value, 10),
        activePagination.sortedBy,
        activePagination.isAscending
      )
    );
    
  };

  const handleActivePageNoChange = (event, newPageNo) => {
    setActivePagination(
      new Pagination(
        newPageNo,
        activePagination.pageSize,
        activePagination.sortedBy,
        activePagination.isAscending
      )
    );
    
  };

  const handleActiveSortedByChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        activePagination.pageSize,
        event.target.value,
        activePagination.isAscending
      )
    );
    
  };

  const handleActiveSortOrderChange = (event) => {
    setActivePagination(
      new Pagination(
        activePagination.pageNo,
        activePagination.pageSize,
        activePagination.sortedBy,
        event.target.value === "Ascending" ? true : false
      )
    );
    
  };

  const handleActiveSuppliesLoad = (contents) => {
    setActiveSupplies(contents);
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllActiveSupplies = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/supply/active`,
      activePagination.tojson(),
      handleActiveSuppliesLoad,
      handleActiveTotalPagesLoad
    );
  };

  const loadAllSupplies = () => {
    getAllActiveSupplies();
  };

  const addSuccessAction = () => {
    loadAllSupplies();
    setOpenStockOutModal(false);
    setAddTransaction(
      new Transaction(
        1,
        currentUser,
        currentDate,
        activeSupplies[0]?.supplierName,
        1,
        activeSupplies[0]?.supplyName,
        activeSupplies[0]?.unitOfMeasurementName,
        1,
        defaultExpirationDate,
        "STOCK_IN"
      )
    );
  };

  const stockOut = () => {
    rest.add(
      `${INITIAL_URL}/transaction/stock-out`,
      addTransaction.toJson(),
      addSuccessAction,
      `Successully added the transaction`
    );
  };


  useEffect(() => {
    loadAllSupplies();
  }, [activePagination, inactivePagination]);

  return (
    <div className={styles["supply-page"]}>
      <Toast />
      <AddStockOutTransactionModal 
        supplyName={addTransaction.supplyName}
        quantity ={addTransaction.supplyQuantity}
        unitOfMeasurement={addTransaction.unitOfMeasurementAbbreviation}
        quantityOnChange={handleQuantityStockOutChange}
        onClickAddButton={handleAddModalButtonClicked}
        openAddModal={openStockOutModal}
        handleCloseAddModal={handleCloseAddModal}
      />

      <section className={styles["supply-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supply-page__lower-section"]}>
        <Navigation page="stock-out" />
        <section className={styles["supply-page__main-section"]}>
          <section className={styles["supply-page__main-bottom-section"]}>
            <StockOutSupplyTable
              headers={headers}
              rows={activeSupplies}
              sortOrder={
                activePagination.isAscending ? "Ascending" : "Descending"
              }
              sortedBy={activePagination.sortedBy}
              pageNo={activePagination.pageNo}
              pageSize={activePagination.pageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
              tableState="active"
              handlePageNoChange={handleActivePageNoChange}
              handlePageSizeChange={handleActivePageSizeChange}
              handleSortedByChange={handleActiveSortedByChange}
              handleSortOrderChange={handleActiveSortOrderChange}
              selectedItemsCount={selectedActiveItemsCount}
              handleOpenStockOutModal={handleOpenStockOutModal}
            />
          </section>
        </section>
      </section>
    </div>
  );
};

export default StockOutTransactionPage;