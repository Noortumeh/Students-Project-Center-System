import  { useState } from 'react';
import AddProject from '../projectdeatils/AddProjects.jsx';
import ProjectList from '../projectdeatils/ProjectList.jsx';

const HomePage1 = () => {
  const [projects, setProjects] = useState([]);

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <div>
      <h1>Project Management</h1>
      <AddProject onAdd={handleAddProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default HomePage1;
