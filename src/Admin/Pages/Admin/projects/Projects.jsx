import { Container, Box, Typography } from '@mui/material';
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx';
import CreateProjectButton from '../../../Components/generalcomponent/CreateProjectButton.jsx';
import EntriesControl from '../../../Components/generalcomponent/EntriesControl.jsx';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Dashboard from '../../../Components/generalcomponent/dashbord/Dashbord.jsx';
import ActionButtons from '../../../Components/generalcomponent/ActionButtons.jsx';

// const fetchProjects = async () => {
//   const response = await fetch('/api/projects');
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

const ProjectPage = () => {
  // const { data: projects = [], error, isLoading } = useQuery({
  //   queryKey: ['projects'],
  //   queryFn: fetchProjects,
  // });
  const [projects, setProjects] = useState([]); // Use empty array as default
  const [favorite, setFavorite] = useState({});

  const toggleFavorite = (id) => {
    setFavorite((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEdit = (id) => {
    console.log(`Edit project with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete project with ID: ${id}`);
  };

  const columns = [
    { id: 'id', label: 'Project ID' },
    { id: 'name', label: 'Project Name' },
    { id: 'supervisorName', label: 'Supervisor' },
    { id: 'customerName', label: 'Customer' },
    { id: 'workgroupName', label: 'Workgroup' },
    { id: 'favorite', label: 'Favorite', render: (row) => (
        <button onClick={() => toggleFavorite(row.id)}>
          {favorite[row.id] ? 'Unfavorite' : 'Favorite'}
        </button>
      )
    },
    { id: 'actions', label: 'Actions', render: (row) => (
        <ActionButtons
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
          type="project"
        />
      )
    }
  ];

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (error) {
  //   return <Typography color="error">Error fetching projects: {error.message}</Typography>;
  // }

  return (
    <Dashboard>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Projects</Typography>
          <CreateProjectButton />
        </Box>

        <EntriesControl 
          totalEntries={projects.length} 
          onChange={(direction) => console.log(direction)} 
        />

        <GeneralTable
          columns={columns}
          data={projects}
          actions={[]} 
          onAction={toggleFavorite}
          orderBy="name" 
          order="asc" 
          onRequestSort={() => {}} 
        />
      </Container>
    </Dashboard>
  );
};

export default ProjectPage;