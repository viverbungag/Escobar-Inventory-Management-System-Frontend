import React from 'react'
import styles from "./DashboardPage.module.scss";
import WindowControlBar from "../../Shared/WindowControlBar/WindowControlBar";
import Navigation from "../../Shared/Navigation/Navigation";

const DashboardPage = () => {
  return (
    <div className={styles["dashboard-page"]}>

    <section className={styles["dashboard-page__upper-section"]}>
      <WindowControlBar />
    </section>

    <section className={styles["dashboard-page__lower-section"]}>
      <Navigation page="dashboard" />
      <section className={styles["dashboard-page__main-section"]}>
        <section className={styles["dashboard-page__main-bottom-section"]}>
          dashboard
        </section>
      </section>
    </section>
  </div>
  )
}

export default DashboardPage