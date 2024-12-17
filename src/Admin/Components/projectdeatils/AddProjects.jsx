import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
/* eslint-disable react/prop-types */

const AddProject = ({ onAdd }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [supervisorId, setSupervisorId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { projectName, description, clientId, supervisorId };
    await axios.post('YOUR_API_URL', newProject);
    onAdd(newProject);
    setProjectName('');
    setDescription('');
    setClientId('');
    setSupervisorId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <TextField
        label="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        required
      />
      <TextField
        label="Supervisor ID"
        value={supervisorId}
        onChange={(e) => setSupervisorId(e.target.value)}
        required
      />
      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default AddProject;
