import { Container, Paper, Typography } from '@mui/material';
import ProjectNameField from '../generalcomponent/ProjectNameField';
import LoadingButton from '../generalcomponent/LoadingButton';
import SelectItem from '../generalcomponent/SelectItem';

function ProjectForm({ 
  projectName, 
  setProjectName, 
  selectedSupervisor, 
  setSelectedSupervisor, 
  selectedCustomer, 
  setSelectedCustomer, 
  loading, 
  handleSubmit 
}) {

  // التعامل مع إزالة المشرف من القائمة
  const handleSupervisorRemove = (supervisor) => {
    setSelectedSupervisor(prevState => prevState.filter(item => item !== supervisor));
  };

  // التعامل مع إزالة العميل من القائمة
  const handleCustomerRemove = (customer) => {
    setSelectedCustomer(prevState => prevState.filter(item => item !== customer));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <ProjectNameField projectName={projectName} setProjectName={setProjectName} />
          
          {/* عنصر لاختيار المشرفين */}
          <SelectItem 
            selectedItems={selectedSupervisor} 
            onRemove={handleSupervisorRemove} 
            itemType="Supervisor" 
          />

          {/* عنصر لاختيار العملاء */}
          <SelectItem 
            selectedItems={selectedCustomer} 
            onRemove={handleCustomerRemove} 
            itemType="Customer" 
          />
          
          {/* زر التحميل */}
          <LoadingButton loading={loading} />
        </form>
      </Paper>
    </Container>
  );
}

export default ProjectForm;
