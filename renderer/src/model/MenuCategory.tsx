import axios from "axios";
import { useEffect } from "react";


class MenuCategory{
  menuCategoryId: number;
  menuCategoryName: string;

  constructor(menuCategoryId: number, menuCategoryName: string){
    this.menuCategoryId = menuCategoryId;
    this.menuCategoryName = menuCategoryName;
  }

  getTableData(){
    return {
      menuCategoryName: this.menuCategoryName
    }
  }
}

export default MenuCategory