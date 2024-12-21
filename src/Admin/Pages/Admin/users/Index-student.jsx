import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import { CircularProgress, Box, Button } from '@mui/material';
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx';
import Filters from '../../../Components/generalcomponent/Filters.jsx';
import { fetchSupervisors } from '../../../../util/http for admin/http.js'

export default function IndexStudent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(20);

  const { data: supervisors = [], isLoading, error } = useQuery({
    queryKey: ['supervisors'],
    queryFn: fetchSupervisors
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading supervisors: {error.message}</div>;
  }

  const columns = [
    { id: 'value', label: 'Supervisor ID' },
    { id: 'label', label: 'Name' }
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
        data={supervisors.filter(supervisor => 
          supervisor.label.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, entriesToShow)}
        orderBy="value"
        order="asc"
        onRequestSort={() => {}}
        onDetailsClick={(id) => console.log(`View details for supervisor with ID: ${id}`)}
        onDelete={(id) => console.log(`Delete supervisor with ID: ${id}`)}
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