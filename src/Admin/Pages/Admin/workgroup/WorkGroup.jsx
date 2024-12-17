import { useState, useCallback } from 'react';
import {
  Grid2 as Grid,
  Paper,
  Typography,
} from '@mui/material';

import Filters from '../../../Components/generalcomponent/Filters.jsx'; 
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx'; 
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx';

const WorkgroupPage = () => { 
  
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [workgroups, setWorkgroups] = useState([
    { id: 1, workgroupName: 'Group A', supervisorName: 'John Doe', customerName: 'Company X', projectName: 'Project 1' },
    { id: 2, workgroupName: 'Group B', supervisorName: 'Jane Doe', customerName: 'Company Y', projectName: 'Project 2' },
    { id: 3, workgroupName: 'Group C', supervisorName: 'Mark Smith', customerName: 'Company Z', projectName: 'Project 3' },
  ]);

  const handleDetailsClick = useCallback((workgroupId) => {
    console.log(`Details requested for workgroup: ${workgroupId}`);
  }, []);

  const handleDelete = useCallback((workgroupId) => {
    setWorkgroups((prevWorkgroups) => prevWorkgroups.filter((workgroup) => workgroup.id !== workgroupId)); // Remove workgroup from state
    console.log(`Deleted workgroup: ${workgroupId}`);
  }, []);

  return (
    <Dashboard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Workgroup Management
            </Typography>

            <Filters
              entriesToShow={entriesToShow}
              setEntriesToShow={setEntriesToShow}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <GeneralTable
              data={workgroups} 
              onDetailsClick={handleDetailsClick} 
              onDelete={handleDelete} 
              columns={[
                { id: 'workgroupName', label: 'Workgroup Name' },
                { id: 'supervisorName', label: 'Supervisor Name' },
                { id: 'customerName', label: 'Customer Name' },
                { id: 'projectName', label: 'Project Name' },
                {
                  id: 'actions',
                  label: 'Actions',
                  render: (row) => (
                    <ActionButtons
                      onEdit={() => console.log(`Edit ${row.workgroupName}`)}
                      onDelete={() => handleDelete(row.id)}
                      type="workgroup"
                    />
                  ),
                },
              ]} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default WorkgroupPage;