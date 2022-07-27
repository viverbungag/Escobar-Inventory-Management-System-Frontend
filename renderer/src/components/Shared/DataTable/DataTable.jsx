import styles from "./DataTable.module.scss";
import { Checkbox } from "@mui/material";
import { TablePagination } from '@mui/material';
import SortSelect from "../SortSelect/SortSelect";
import SortOrderRadioGroup from "../SortOrderRadioGroup/SortOrderRadioGroup";

export default function EnhancedTable({headers, rows, 
  sortOrder, sortedBy, pageNo, sortItems, 
  pageSize, totalPages, handleItemCheckboxChange,
  isSelectAllChecked, handleSelectAllClick, 
  handlePageNoChange, handlePageSizeChange,
  handleSortedByChange, handleSortOrderChange}) {

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
            <td><Checkbox checked={isSelectAllChecked} onClick={handleSelectAllClick}/></td>
            {headers.map((header) => (
              <td key={header.id}>{header.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index)=>(
            <tr key={index} onClick={()=>{handleItemCheckboxChange(row)}} className={row.isSelected && styles["data-table__row--selected"]}>
              <td><Checkbox checked={row.isSelected}/></td>
              {headers.map((header) =>(
                <td key={header.value}>{String(row[header.value])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
