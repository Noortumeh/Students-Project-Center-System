import React, { useState, useCallback } from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import Filters from '../../../Components/generalcomponent/Filters.jsx'; 
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx'; 

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
            ]} 
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default WorkgroupPage;
