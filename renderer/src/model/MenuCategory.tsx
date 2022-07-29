class MenuCategory{
  menuCategoryId: number;
  menuCategoryName: string;
  isActive: boolean;

  constructor(menuCategoryId: number, menuCategoryName: string, isActive: boolean){
    this.menuCategoryId = menuCategoryId;
    this.menuCategoryName = menuCategoryName;
    this.isActive = isActive;
  }
}

export default MenuCategory