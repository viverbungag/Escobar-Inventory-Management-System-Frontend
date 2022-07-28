import styles from "./DataTable.module.scss";
import { Checkbox } from "@mui/material";
import { TablePagination } from '@mui/material';
import SortSelect from "../SortSelect/SortSelect";
import SortOrderRadioGroup from "../SortOrderRadioGroup/SortOrderRadioGroup";
import { Icon } from '@iconify/react';
import editIcon from '@iconify/icons-akar-icons/edit';

export default function EnhancedTable({headers, rows, 
  sortOrder, sortedBy, pageNo, sortItems, tableState,
  pageSize, totalPages, handleItemCheckboxChange,
  isSelectAllChecked, handleSelectAllClick, 
  handlePageNoChange, handlePageSizeChange,
  handleSortedByChange, handleSortOrderChange,
  handleOpenEditModal, selectedItemsCount}) {

  return (
    <div className={styles["data-table"]}>
      <div className ={styles["data-table__controls"]}>
        <div className ={styles["data-table__sort"]}>
        <SortSelect 
            sortItems={sortItems} 
            selectedSort={sortedBy} 
            handleChange={handleSortedByChange}
        />
        <SortOrderRadioGroup sortOrder={sortOrder} handleChange={handleSortOrderChange}/>
        </div>

        <TablePagination
            component="div"
            count={totalPages}
            page={pageNo}
            onPageChange={handlePageNoChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handlePageSizeChange}
          />
      </div>


      <table>
        <thead>
          <tr>
            <td>
              <Checkbox 
                checked={isSelectAllChecked} 
                onClick={handleSelectAllClick}
                indeterminate={selectedItemsCount > 0 && selectedItemsCount < rows.length}
                />
                
            </td>
            {headers.map((header) => (
              <td key={header.id}>{header.label}</td>
            ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index)=>(
            <tr key={index} onClick={()=>{handleItemCheckboxChange(row)}} className={row.isSelected ? styles["data-table__row--selected"]:undefined}>
              <td><Checkbox checked={row.isSelected}/></td>
              {headers.map((header) =>(
                <td key={header.value}>{String(row[header.value])}</td>
              ))}
              <td className={styles["data-table__edit-icon"]}>
                <button onClick = {()=>handleOpenEditModal(row, tableState)}>
                  <Icon icon={editIcon} width="20" height="20" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
