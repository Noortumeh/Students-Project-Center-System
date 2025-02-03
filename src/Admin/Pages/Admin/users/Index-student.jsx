import { useQuery } from '@tanstack/react-query';
import { DataGrid } from "@mui/x-data-grid";
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Paper, Typography, Chip } from '@mui/material';
import { fetchStudents } from '../../../../util/http for admin/http.js';

export default function IndexStudent() {
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    onError: (err) => console.error('Error fetching students:', err),
  });

  if (isLoading) {
    return (
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:'100vh'}}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading students: {error.message}</div>;
  }

  // الأعمدة
  const columns = [
    { field: 'fullName', headerName: 'Student Name', width: 300, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    {
      field: 'projects',
      headerName: 'Projects',
      width: 400,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        if (params.row.projects && Array.isArray(params.row.projects)) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '10px' }}>
              {params.row.projects.map((project, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {project.name}
                  </Typography>
                  <Chip
                    label={project.status}
                    color={statusColors[project.status] || 'default'}
                    size="small"
                  />
                </Box>
              ))}
            </Box>
          );
        } else {
          return <Typography variant="body2">No projects available</Typography>;
        }
      },
    },
    { field: 'email', headerName: 'Email', width: 300, headerClassName: 'header', headerAlign: 'center', align: 'center' },
  ];
  

  // تحديد الألوان الخاصة بالحالات
  const statusColors = {
    active: 'success',
    pending: 'warning',
    completed: 'primary',
    canceled: 'default',
  };

  return (
      <Box sx={{ padding: 3, mt: 6}}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold', textAlign: 'center' }}>
          Students
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#f5f5f5' ,height: "100vh", width: { xs: '11rem', sm: '25rem', md: '45rem', lg: '70rem' }}}>
          <Box sx={{ height: { xs: 'auto', md: '100vh' }, width:'100%', overflowX: 'auto' }}>
            <DataGrid
              rows={students || []}
              columns={columns}
              checkboxSelection={false}
              autoHeight
              rowHeight={80}
              headerHeight={80}
              
            />
          </Box>
        </Paper>
      </Box>
  );
}