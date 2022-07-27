import styles from "./DataTable.module.scss";
import { Checkbox } from "@mui/material";
import { TablePagination } from '@mui/material';

export default function EnhancedTable({headers, rows, 
  isAscending, sortedBy, pageNo, 
  pageSize, totalPages, handleItemCheckboxChange,
  isSelectAllChecked, handleSelectAllClick, 
  handlePageNoChange, handlePageSizeChange}) {

  return (
    <div className={styles["DataTable"]}>
      <TablePagination
          component="div"
          count={totalPages}
          page={pageNo}
          onPageChange={handlePageNoChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handlePageSizeChange}
        />

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
            <tr key={index} onClick={()=>{handleItemCheckboxChange(row)}}>
              <td><Checkbox checked={row.isSelected}/></td>
              {headers.map((header, index) =>(
                <td key={index}>{row[header.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
