import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Button } from '@mui/material';
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx';
import Filters from '../../../Components/generalcomponent/Filters.jsx';
import { fetchStudents } from '../../../../util/http for admin/http.js'; // استيراد الدالة الجديدة

export default function IndexStudent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: () => fetchStudents() // استدعاء الدالة الجديدة
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

  const columns = [
    { id: 'id', label: 'Student ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'middleName', label: 'Middle Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'projectName', label: 'Project Name' },
    { id: 'projectStatus', label: 'Project Status' }
  ];

  return (
    <Dashboard>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="contained" color="primary" href="/users/create-student" sx={{ backgroundColor: '#4CAF50' }}>
          + Create User
        </Button>
      </Box>
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        entriesToShow={entriesToShow}
        setEntriesToShow={setEntriesToShow}
      />
      <GeneralTable
        columns={columns}
        data={students.filter(student => 
          student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, entriesToShow)}
        orderBy="id"
        order="asc"
        onRequestSort={() => {}}
        onDetailsClick={(id) => console.log(`View details for student with ID: ${id}`)}
        onDelete={(id) => console.log(`Delete student with ID: ${id}`)}
        sx={{
          '& .MuiTableCell-root': {
            padding: '8px',
          },
          '& .MuiIconButton-root': {
            margin: '0 4px',
          }
        }}
      />
    </Dashboard>
  );
}