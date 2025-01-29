import { useQuery } from '@tanstack/react-query';
import { DataGrid } from "@mui/x-data-grid";
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box } from '@mui/material';
import { fetchStudents } from '../../../../util/http for admin/http.js';

export default function IndexStudent() {
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetchStudents(20, 1),
    onError: (err) => console.error('Error fetching students:', err),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading students: {error.message}</div>;
  }

  // إعداد البيانات مع الحقل fullName
  const studentsWithFullName = students.map((student) => ({
    ...student,
    id: student.id, 
    fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
  }));

  // تعديل الأعمدة لتشمل ProjectStatus
  const columns = [
    { field: 'fullName', headerName: 'Student Name', width: 200 },
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'projectStatus', headerName: 'Project Status', width: 200 }, 
  ];

  return (
    <Dashboard>
      <Box sx={{ padding: 3, height: 600 ,mt:6}}>

        <DataGrid
          rows={studentsWithFullName || []}
          columns={columns}
          checkboxSelection={false} 
          pageSize={10}
        />
      </Box>
    </Dashboard>
  );
}
