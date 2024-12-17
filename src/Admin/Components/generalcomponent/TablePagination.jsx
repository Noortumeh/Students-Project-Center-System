/* eslint-disable react/prop-types */
import { TablePagination } from '@mui/material';

const TablePaginationComponent = ({ count, page, onPageChange, rowsPerPage, onRowsPerPageChange }) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default TablePaginationComponent;
