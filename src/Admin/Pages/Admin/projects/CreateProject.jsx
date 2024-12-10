import { useState, useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// استيراد المكونات
import ProjectForm from '../../../Components/createproject/ProjectForm.jsx'; // لا حاجة لاستيراد SelectItem هنا
import LoadingButton from '../../../Components/generalcomponent/LoadingButton.jsx';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
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
      supervisorId: selectedSupervisor[0]?.value, // Take the first supervisor from the list
      customerId: selectedCustomer[0]?.value, // Take the first customer from the list
    };

    try {
      await axios.post('https://localhost:7206/api/projects', newProject);
      toast.success('Project created successfully!');
      setProjectName('');
      setSelectedSupervisor([]);
      setSelectedCustomer([]);
      navigate('/projects/Projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
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
          {/* استخدم المكونات المستوردة هنا */}
          <ProjectForm
            projectName={projectName}
            setProjectName={setProjectName}
            supervisors={supervisors}
            selectedSupervisor={selectedSupervisor}
            setSelectedSupervisor={setSelectedSupervisor}
            customers={customers}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />

          {/* زر التحميل */}
          <LoadingButton loading={loading} label="Create Project" />
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProject;
