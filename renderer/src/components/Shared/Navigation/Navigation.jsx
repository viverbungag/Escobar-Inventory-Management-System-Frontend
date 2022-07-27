import React from 'react'
import styles from "./Navigation.module.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navigation = () => {
  return (
    <div className={styles["navigation"]}>
        <div className={styles["navigation__title"]}>NAVIGATION</div>
        <div className={styles["navigation__list"]}>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Dashboard</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Menu</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Supply</div>
            </div>
        </div>

        <div className={styles["navigation__title"]}>TRANSACTIONS</div>
        <div className={styles["navigation__list"]}>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Stock-In</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Stock-Out</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>View Transactions</div>
            </div>
        </div>

        <div className={styles["navigation__title"]}>OTHERS</div>
        <div className={styles["navigation__list"]}>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Supplier</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Menu Category</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Supply Category</div>
            </div>

            <div className={styles["navigation__item-container"]}>
                <div className={styles["navigation__item-icon"]}><DashboardIcon/></div>
                <div className={styles["navigation__item-text"]}>Unit of Measurement</div>
            </div>
        </div>




    
    </div>
  )
}

export default Navigation