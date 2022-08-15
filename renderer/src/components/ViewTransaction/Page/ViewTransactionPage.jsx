import React, { useState, useEffect } from "react";
import styles from "./ViewTransactionPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import Toast from "../../Shared/Toast/Toast";
import Pagination from "src/model/Pagination";
import Rest from "../../../rest/Rest";
import ViewTransactionTable from "../ViewTransactionTable/ViewTransactionTable";

const INITIAL_URL = "http://localhost:8080/api/v1";

const headers = [
  {
    id: "id",
    label: "Id",
    value: "transactionId",
  },
  {
    id: "transactionDate",
    label: "Transaction Date",
    value: "transactionDate",
  },
  {
    id: "supply",
    label: "Supply",
    value: "supplyName",
  },
  {
    id: "supplier",
    label: "Supplier",
    value: "supplierName",
  },
  {
    id: "supplyQuantity",
    label: "Quantity",
    value: "supplyQuantity",
  },
  {
    id: "unitOfMeasurementAbbreviation",
    label: "Measurement",
    value: "unitOfMeasurementAbbreviation",
  },
  {
    id: "pricePerUnit",
    label: "Price per Unit",
    value: "pricePerUnit",
  },
  {
    id: "transactBy",
    label: "Transact By",
    value: "transactByName",
  },
  {
    id: "transactionType",
    label: "Type",
    value: "transactionType",
  },
];

const sortItems = [
  {
    label: "Transaction Date",
  },
  {
    label: "Supply",
  },
  {
    label: "Supplier",
  },
  {
    label: "Quantity",
  },
  {
    label: "Transact By",
  },
];

const ViewTransactionPage = () => {
  const currentDate = new Date();
  const defaultExpirationDate = new Date(currentDate.getTime());
  defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 7);

  const currentUser = "Bungag, Viver";

  const [transactions, setTransactions] = useState([]);

  const [activePagination, setActivePagination] = useState(
    new Pagination(0, 10, "None", true)
  );

  const [activeTotalPages, setActiveTotalPages] = useState(0);

  const rest = new Rest();

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

  const handleTransactionsLoad = (contents) => {
    setTransactions(contents);
  };

  const handleActiveTotalPagesLoad = (data) => {
    setActiveTotalPages(data);
  };

  const getAllTransactions = () => {
    rest.getWithPagination(
      `${INITIAL_URL}/transaction`,
      activePagination.tojson(),
      handleTransactionsLoad,
      handleActiveTotalPagesLoad
    );
  };

  const loadAllTransactions = () => {
    getAllTransactions();
  };


  useEffect(() => {
    loadAllTransactions();
  }, [activePagination]);

  return (
    <div className={styles["supply-page"]}>
      <Toast />
      <section className={styles["supply-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["supply-page__lower-section"]}>
        <Navigation page="view-transactions" />
        <section className={styles["supply-page__main-section"]}>
          <section className={styles["supply-page__main-bottom-section"]}>
            <ViewTransactionTable
              headers={headers}
              rows={transactions}
              sortOrder={
                activePagination.isAscending ? "Ascending" : "Descending"
              }
              sortedBy={activePagination.sortedBy}
              pageNo={activePagination.pageNo}
              pageSize={activePagination.pageSize}
              totalPages={activeTotalPages}
              sortItems={sortItems}
              handlePageNoChange={handleActivePageNoChange}
              handlePageSizeChange={handleActivePageSizeChange}
              handleSortedByChange={handleActiveSortedByChange}
              handleSortOrderChange={handleActiveSortOrderChange}
            />
          </section>
        </section>
      </section>
    </div>
  );
};

export default ViewTransactionPage;
