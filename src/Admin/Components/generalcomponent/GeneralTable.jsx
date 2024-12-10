import PropTypes from 'prop-types';  
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Paper,
} from '@mui/material';

const GeneralTable = ({ 
  columns, 
  data, 
  orderBy, 
  order, 
  onRequestSort, 
  onDetailsClick, 
  onDelete 
}) => {
  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    onRequestSort(property, isAsc ? 'desc' : 'asc');
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={() => handleSortRequest(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => onDetailsClick(row.id)}>
                    View Details
                  </IconButton>
                  <IconButton onClick={() => onDelete(row.id)}>
                    Delete
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

GeneralTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      workgroupName: PropTypes.string,
      supervisorName: PropTypes.string,
      customerName: PropTypes.string,
      projectName: PropTypes.string,
    })
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired, 
  onDelete: PropTypes.func.isRequired, 
};

export default GeneralTable;
