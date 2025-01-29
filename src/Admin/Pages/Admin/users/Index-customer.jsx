import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from '../../../../util/http for admin/http.js';

export default function IndexCustomer() {
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(6); 

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers', page, pageSize], 
    queryFn: () => fetchCustomers(pageSize, page + 1), 
    onError: (err) => {
      console.error('Error fetching customers:', err);
    },
  });

  if (isLoading) {
    return (
      <Box  display="flex" justifyContent="center" alignItems="center" height="100vh" >
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

  // إنشاء حقل fullName
  const customersWithFullName = customers.map((customer) => ({
    ...customer,
    id: customer.id, // id مطلوب لـ DataGrid
    fullName: `${customer.firstName} ${customer.lastName}`,
  }));

  const columns = [
    { field: 'fullName', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'workgroupName', headerName: 'Workgroup', width: 200 },
  ];
  

  return (
    <Dashboard>
      <Box p={3} sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
  
        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={customersWithFullName || []}
            columns={columns}
            checkboxSelection={false}
            pageSize={pageSize}
            rowsPerPageOptions={[6, 20, 50]}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
          />
        </Box>
      </Box>
    </Dashboard>
  );
  
}
