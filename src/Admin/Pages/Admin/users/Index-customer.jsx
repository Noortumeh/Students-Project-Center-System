import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { fetchCustomers } from '../../../../util/http for admin/http.js';

export default function IndexCustomer() {

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'], 
    queryFn: () => fetchCustomers(), 
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

  // التأكد من أن العملاء قد تم تحميلهم بشكل صحيح
  console.log("Customers:", customers);

  // إنشاء حقل fullName
  const customersWithFullName = customers.map((customer) => ({
    ...customer,
    id: customer.id, // id مطلوب لـ DataGrid
    fullName: `${customer.firstName} ${customer.lastName}`,
    projects: customer.projects ? customer.projects.map(project => project.name).join(', ') : 'No Projects',
  }));

  // التأكد من البيانات قبل عرضها في الجدول
  console.log("Processed Customers:", customersWithFullName);

  const columns = [
    { field: 'fullName', headerName: 'Name', width: 200, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'company', headerName: 'Company', width: 200, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'workgroupName', headerName: 'Workgroup', width: 200, headerClassName: 'header', headerAlign: 'center', align: 'center' },
  ];
  
  return (
      <Box p={3} sx={{ mt:6, }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center',mt:3 }}>
          Customers
        </Typography>
  
        <Box sx={{ height: 600, width: { xs: '11rem', sm: '25rem', md: '45rem', lg: '72rem' } }}>
          <DataGrid
            rows={customersWithFullName || []}
            columns={columns}
            checkboxSelection={false}
            rowsPerPageOptions={[6, 20, 50]}
          
          />
        </Box>
      </Box>
  );
}
