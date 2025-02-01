import { useQuery } from '@tanstack/react-query';
import { DataGrid } from "@mui/x-data-grid";
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Paper } from '@mui/material';
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

  // تجهيز البيانات
  const studentsWithFullNameAndProject = students.map((student) => {
    const project = student.projects.length > 0 
      ? `${student.projects[0].name} \u00A0\u00A0\u00A0${student.projects[0].status}` 
      : 'No Project';
    return {
      ...student,
      id: student.id,
      fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
      project: project,
    };
  });

  // الأعمدة
  const columns = [
    { field: 'fullName', headerName: 'Student Name', width: 200 },
    { field: 'project', headerName: 'Project', width: 350 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  return (
    <Dashboard>
      <Box sx={{ padding: 3, mt: 6 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ height: 400, overflow: 'auto' }}> {/* تحديد ارتفاع وسكرول داخل الجدول فقط */}
            <DataGrid
              rows={studentsWithFullNameAndProject || []}
              columns={columns}
              checkboxSelection={false}
              pageSize={10}
              autoHeight={false} // تعطيل autoHeight حتى يكون السكرول داخل الجدول
            />
          </Box>
        </Paper>
      </Box>
    </Dashboard>
  );
}
