import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Button, Select, MenuItem, Box
} from '@mui/material';
import { Delete, Star, Settings } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const GeneralTable = () => {
  const columns = [
    "Project ID",
    "Project Name",
    "Supervisor Name",
    "Customer Name",
    "Team",
    "Workgroup Name",
    "Details",
    "Action",
  ];

  const rows = Array(10).fill({}); 

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Select defaultValue={20} sx={{ width: 100 }}>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          Create Project
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column === "Details" ? (
                      <Button variant="contained" color="success" size="small">
                        Details
                      </Button>
                    ) : column === "Action" ? (
                      <>
                        <IconButton color="primary">
                          <Star />
                        </IconButton>
                        <IconButton color="primary">
                          <Settings />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </>
                    ) : (
                      "" 
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GeneralTable;
