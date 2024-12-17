import { useState, useEffect } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Button, IconButton } from '@mui/material';
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Filters from '../../../Components/generalcomponent/Filters.jsx';

export default function IndexStudent() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/users');
        const data = await response.json();
        setStudents(data.map(user => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          middleName: user.name.split(' ')[1] || '',
          lastName: user.name.split(' ')[2] || '',
          email: user.email,
          workgroup: 'BSIT', 
          phone: user.phone || 'N/A'
        })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const columns = [
    { id: 'id', label: 'Student ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'middleName', label: 'Middle Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'workgroup', label: 'Workgroup' },
    { id: 'phone', label: 'Phone' }
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