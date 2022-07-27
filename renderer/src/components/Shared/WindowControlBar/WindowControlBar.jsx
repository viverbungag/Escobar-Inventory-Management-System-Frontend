import styles from "./WindowControlBar.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CropDinIcon from '@mui/icons-material/CropDin';
import RemoveIcon from '@mui/icons-material/Remove';

import React from 'react'

const WindowControlBar = () => {
  return (
    <div className = {styles["window-control-bar"]}>
    <div className = {styles["window-control-bar__container"]}>
        <RemoveIcon/>
        <CropDinIcon/>
        <CloseIcon/>
    </div>
</div>
  )
}

export default WindowControlBar