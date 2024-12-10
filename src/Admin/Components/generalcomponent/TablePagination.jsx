import PropTypes from 'prop-types'; 
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
TablePaginationComponent.propTypes = {
  count: PropTypes.number.isRequired, 
  page: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
  rowsPerPage: PropTypes.number.isRequired, 
  onRowsPerPageChange: PropTypes.func.isRequired, 
};

export default TablePaginationComponent;
