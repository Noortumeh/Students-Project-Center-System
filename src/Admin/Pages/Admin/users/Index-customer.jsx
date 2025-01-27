import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import {
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { fetchCustomers } from '../../../../util/http for admin/http.js';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function IndexCustomer() {
  const [entriesToShow] = useState(6);  // يجب أن تكون القيمة الافتراضية 6 كما في الـ API
  const navigate = useNavigate();

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers', entriesToShow],
    queryFn: () => fetchCustomers(entriesToShow, 1),
    onError: (err) => {
      console.error('Error fetching customers:', err);
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error fetching customers: {error.message}</Typography>
      </Box>
    );
  }

  const columns = [
    { id: 'id', label: 'Customer ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'company', label: 'Company' },
    { id: 'workgroupName', label: 'Workgroup' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <IconButton
          color="primary"
          onClick={() => navigate(`/users/customer/edit/${row.id}`)}
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  return (
    <Dashboard>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.render ? column.render(customer) : customer[column.id] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Dashboard>
  );
}