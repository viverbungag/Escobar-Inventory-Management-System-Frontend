import React from "react";
import styles from "./DashboardPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";
import Toast from "../../Shared/Toast/Toast";

const DashboardPage = () => {
  return (
    <div className={styles["dashboard-page"]}>
      <Toast />
      <section className={styles["dashboard-page__upper-section"]}>
        <WindowControlBar />
      </section>

      <section className={styles["dashboard-page__lower-section"]}>
        <Navigation page="dashboard" />
        <section className={styles["dashboard-page__main-section"]}>
          <section className={styles["dashboard-page__main-bottom-section"]}>
            The supplies in minimum quantities would be shown here
          </section>
        </section>
      </section>
    </div>
  );
};

export default DashboardPage;
