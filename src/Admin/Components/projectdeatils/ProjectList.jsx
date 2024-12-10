import PropTypes from 'prop-types'; 
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects }) => {
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </div>
  );
};
ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      projectName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      clientId: PropTypes.string.isRequired,
      supervisorId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProjectList;
