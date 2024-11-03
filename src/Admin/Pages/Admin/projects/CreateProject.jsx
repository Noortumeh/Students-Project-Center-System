import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Paper,
  FormControl,
  TextField,
} from '@mui/material';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateProject({ onAddProject }) {
  const [projectName, setProjectName] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('https://localhost:7206/api/users/get-users?PageSize=6&PageNumber=1');
        const supervisorData = response.data.result.map((supervisor) => ({
          value: supervisor.id,
          label: supervisor.userName.toLowerCase(),
        }));
        setSupervisors(supervisorData);
      } catch (error) {
        toast.error('Failed to fetch supervisors');
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://localhost:7206/api/users/get-users?PageSize=6&PageNumber=1');
        const customerData = response.data.result.map((customer) => ({
          value: customer.id,
          label: customer.userName.toLowerCase(),
        }));
        setCustomers(customerData);
      } catch (error) {
        toast.error('Failed to fetch customers');
      }
    };

    fetchSupervisors();
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newProject = {
      name: projectName,
      supervisorId: selectedSupervisor.value,
      customerId: selectedCustomer.value,
    };

    try {
      await axios.post('https://localhost:7206/api/projects', newProject);
      // await onAddProject(newProject);
      toast.success('Project and Workgroup created successfully!');
      navigate('/projects/Projects');
    } catch (error) {
      console.error('Error creating project or workgroup:', error);
      toast.error('Failed to create project or workgroup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              options={supervisors}
              value={selectedSupervisor}
              onChange={setSelectedSupervisor}
              placeholder="Select Supervisor"
              isSearchable
              styles={{ control: (base) => ({ ...base, height: '56px' }) }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              options={customers}
              value={selectedCustomer}
              onChange={setSelectedCustomer}
              placeholder="Select Customer"
              isSearchable
              styles={{ control: (base) => ({ ...base, height: '56px' }) }}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem', mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Project'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
