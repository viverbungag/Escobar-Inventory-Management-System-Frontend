import React from 'react'
import styles from "./ActivateButton.module.scss";

const ActivateButton = ({label, onClick}) => {
  return (
    <button className={styles["activate-button"]} onClick={onClick}>
        <div className ={styles["activate-button__container"]}>
        <span className={styles["activate-button__label"]}>{label}</span>
    </div>
</button>
  )
}

export default ActivateButton