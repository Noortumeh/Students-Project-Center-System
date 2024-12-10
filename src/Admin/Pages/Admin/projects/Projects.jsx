// src/pages/ProjectPage.jsx
import { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import GeneralTable from '../../../Components/generalcomponent/GeneralTable.jsx';
import CreateProjectButton from '../../../Components/generalcomponent/CreateProjectButton.jsx';
import EntriesControl from '../../../Components/generalcomponent/EntriesControl.jsx';
import LoadingSpinner from '../../../Components/generalcomponent/LoadingSpinner.jsx';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // إضافة منطق استرجاع المشاريع هنا
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleFavorite = (id) => {
    setFavorite((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const columns = [
    { id: 'id', label: 'Project ID' },
    { id: 'name', label: 'Project Name' },
    { id: 'supervisorName', label: 'Supervisor' },
    { id: 'customerName', label: 'Customer' },
    { id: 'workgroupName', label: 'Workgroup' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Projects</Typography>
        <CreateProjectButton />
      </Box>

      <EntriesControl 
        totalEntries={projects.length} 
        onChange={(direction) => console.log(direction)} 
      />

      {/* استبدال ProjectTable بـ GeneralTable هنا */}
      <GeneralTable
        columns={columns}
        data={projects}
        actions={[]} // تمرير البيانات المناسبة للـ actions إذا كانت ضرورية
        onAction={toggleFavorite}
        orderBy="name" // يمكن استبداله حسب الحاجة
        order="asc" // أو desc حسب التفضيل
        onRequestSort={() => {}} // إضافة منطق الترتيب إذا كان مطلوبًا
      />
    </Container>
  );
};

export default ProjectPage;
