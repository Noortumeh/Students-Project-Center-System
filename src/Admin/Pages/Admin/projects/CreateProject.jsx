import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  FormControl,
  MenuItem,
  TextField,
  InputLabel,
  Select as MuiSelect,
} from '@mui/material';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function CreateProject({ onAddProject }) {
  const [projectName, setProjectName] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [workgroups, setWorkgroups] = useState([]); // حالة لتخزين قائمة مجموعات العمل
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedWorkgroup, setSelectedWorkgroup] = useState(null); // الحالة الخاصة بمجموعة العمل المختارة
  const [team, setTeam] = useState('');
  const [showFields, setShowFields] = useState(true);
  const [isSupervisorOpen, setIsSupervisorOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isWorkgroupOpen, setIsWorkgroupOpen] = useState(false); // لتتبع حالة فتح القائمة المنسدلة لمجموعة العمل

  const navigate = useNavigate();

  useEffect(() => {
    // جلب المشرفين
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/users');
        const supervisorData = response.data
          .filter((user) => user.role === 'admin')
          .map((supervisor) => ({
            value: supervisor.id,
            label: supervisor.name || `${supervisor.firstName || ''} ${supervisor.lastName || ''}`,
          }));
        setSupervisors(supervisorData);
      } catch (error) {
        toast.error('Failed to fetch supervisors');
      }
    };

    // جلب العملاء
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/users');
        const customerData = response.data
          .filter((user) => user.role === 'customer')
          .map((customer) => ({
            value: customer.id,
            label: customer.name || `${customer.firstName || ''} ${customer.lastName || ''}`,
          }));
        setCustomers(customerData);
      } catch (error) {
        toast.error('Failed to fetch customers');
      }
    };

    // جلب مجموعات العمل
    const fetchWorkgroups = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/workgroups');
        const workgroupData = response.data.map((workgroup) => ({
          value: workgroup.id,
          label: workgroup.name,
        }));
        setWorkgroups(workgroupData);
      } catch (error) {
        toast.error('Failed to fetch workgroups');
      }
    };

    fetchSupervisors();
    fetchCustomers();
    fetchWorkgroups(); // استدعاء الدالة لجلب مجموعات العمل
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      projectName,
      supervisor: selectedSupervisor?.label,
      customer: selectedCustomer?.label,
      workgroup: selectedWorkgroup?.label, // استخدام اسم مجموعة العمل المختارة
      team,
    };

    onAddProject(newProject);
    toast.success('Project created successfully!');
    navigate('/projects/Projects');
  };

  // تحديد متى يتم فتح أو إغلاق القوائم المنسدلة
  const handleSupervisorMenuOpen = () => {
    setIsSupervisorOpen(true);
    setShowFields(false);
  };

  const handleSupervisorMenuClose = () => {
    setIsSupervisorOpen(false);
    setShowFields(true);
  };

  const handleCustomerMenuOpen = () => {
    setIsCustomerOpen(true);
    setShowFields(false);
  };

  const handleCustomerMenuClose = () => {
    setIsCustomerOpen(false);
    setShowFields(true);
  };

  const handleWorkgroupMenuOpen = () => {
    setIsWorkgroupOpen(true);
    setShowFields(false);
  };

  const handleWorkgroupMenuClose = () => {
    setIsWorkgroupOpen(false);
    setShowFields(true);
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
              onMenuOpen={handleSupervisorMenuOpen}
              onMenuClose={handleSupervisorMenuClose}
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
              onMenuOpen={handleCustomerMenuOpen}
              onMenuClose={handleCustomerMenuClose}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              options={workgroups}
              value={selectedWorkgroup}
              onChange={setSelectedWorkgroup}
              placeholder="Select Workgroup"
              isSearchable
              styles={{ control: (base) => ({ ...base, height: '56px' }) }}
              onMenuOpen={handleWorkgroupMenuOpen}
              onMenuClose={handleWorkgroupMenuClose}
            />
          </FormControl>

          {showFields && (
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="team-label">Team</InputLabel>
              <MuiSelect
                labelId="team-label"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                label="Team"
              >
                <MenuItem value="Team A">Team A</MenuItem>
                <MenuItem value="Team B">Team B</MenuItem>
                <MenuItem value="Team C">Team C</MenuItem>
              </MuiSelect>
            </FormControl>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem', mb: 2 }}
          >
            Create Project
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
