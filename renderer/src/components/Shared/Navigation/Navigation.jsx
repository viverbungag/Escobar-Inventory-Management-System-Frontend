import React from "react";
import styles from "./Navigation.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupIcon from "@mui/icons-material/Group";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StraightenIcon from "@mui/icons-material/Straighten";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className={styles["navigation"]}>
      <div className={styles["navigation__title"]}>NAVIGATION</div>
      <div className={styles["navigation__list"]}>
        <div className={styles["navigation__item-container"]}>
          <div className={styles["navigation__item-icon"]}>
            <DashboardIcon />
          </div>
          <div className={styles["navigation__item-text"]}>Dashboard</div>
        </div>

        <div className={styles["navigation__item-container"]}>
          <div className={styles["navigation__item-icon"]}>
            <RestaurantMenuIcon />
          </div>
          <div className={styles["navigation__item-text"]}>Menu</div>
        </div>
        <Link href="/supply">
          <div className={styles["navigation__item-container"]}>
            <div className={styles["navigation__item-icon"]}>
              <KitchenIcon />
            </div>
            <div className={styles["navigation__item-text"]}>Supply</div>
          </div>
        </Link>
      </div>

      <div className={styles["navigation__title"]}>TRANSACTIONS</div>
      <div className={styles["navigation__list"]}>
        <div className={styles["navigation__item-container"]}>
          <div className={styles["navigation__item-icon"]}>
            <AddBoxIcon />
          </div>
          <div className={styles["navigation__item-text"]}>Stock-In</div>
        </div>

        <div className={styles["navigation__item-container"]}>
          <div className={styles["navigation__item-icon"]}>
            <IndeterminateCheckBoxIcon />
          </div>
          <div className={styles["navigation__item-text"]}>Stock-Out</div>
        </div>

        <div className={styles["navigation__item-container"]}>
          <div className={styles["navigation__item-icon"]}>
            <VisibilityIcon />
          </div>
          <div className={styles["navigation__item-text"]}>
            View Transactions
          </div>
        </div>
      </div>

      <div className={styles["navigation__title"]}>OTHERS</div>
      <div className={styles["navigation__list"]}>
        <Link href="/supplier">
          <div className={styles["navigation__item-container"]}>
            <div className={styles["navigation__item-icon"]}>
              <GroupIcon />
            </div>
            <div className={styles["navigation__item-text"]}>Supplier</div>
          </div>
        </Link>

        <Link href="/menu-category">
          <div className={styles["navigation__item-container"]}>
            <div className={styles["navigation__item-icon"]}>
              <BrunchDiningIcon />
            </div>
            <div className={styles["navigation__item-text"]}>Menu Category</div>
          </div>
        </Link>

        <Link href="/supply-category">
          <div className={styles["navigation__item-container"]}>
            <div className={styles["navigation__item-icon"]}>
              <ShoppingBagIcon />
            </div>
            <div className={styles["navigation__item-text"]}>
              Supply Category
            </div>
          </div>
        </Link>

        <Link href="/unit-of-measurement">
          <div className={styles["navigation__item-container"]}>
            <div className={styles["navigation__item-icon"]}>
              <StraightenIcon />
            </div>
            <div className={styles["navigation__item-text"]}>
              Unit of Measurement
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
