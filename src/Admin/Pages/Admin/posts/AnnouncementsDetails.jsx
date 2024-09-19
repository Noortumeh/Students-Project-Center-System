import React, { useState } from 'react';
import { Card, Button, Modal, Pagination } from 'react-bootstrap';
import Dashboard from '../../../Components/dashbord/Dashbord.jsx'; // استدعاء مكون الداشبورد

// بيانات الإعلانات (يمكن لاحقًا استبدالها ببيانات من API)
const announcementsData = [
  {
    id: 1,
    projectTitle: 'Student Project Management System',
    customerName: 'ABC University',
    supervisorName: 'Dr. John Smith',
    description: 'A platform to streamline student project management.',
    date: 'June 10, 2024',
  },
  {
    id: 2,
    projectTitle: 'Online Shopping Platform',
    customerName: 'XYZ Retail',
    supervisorName: 'Dr. Alice Brown',
    description: 'A complete solution for online retail management.',
    date: 'July 20, 2024',
  },
  {
    id: 3,
    projectTitle: 'AI-Based Healthcare System',
    customerName: 'HealthCorp',
    supervisorName: 'Dr. Michael Johnson',
    description: 'A system to automate healthcare workflows using AI.',
    date: 'August 15, 2024',
  },
  {
    id: 4,
    projectTitle: 'Education Management System',
    customerName: 'EduCorp',
    supervisorName: 'Dr. Emily Davis',
    description: 'A system to manage educational institutions efficiently.',
    date: 'September 10, 2024',
  },
  {
    id: 5,
    projectTitle: 'Real Estate Management Platform',
    customerName: 'RealtyPro',
    supervisorName: 'Dr. Kevin Lee',
    description: 'A platform for managing real estate properties.',
    date: 'October 5, 2024',
  },
  {
    id: 6,
    projectTitle: 'Social Media Marketing Automation',
    customerName: 'SocialBuzz',
    supervisorName: 'Dr. Chris Wilson',
    description: 'A tool for automating social media marketing tasks.',
    date: 'November 12, 2024',
  },
];

export default function Announcements() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // حساب عدد الصفحات بناءً على عدد الإعلانات والمشاريع في كل صفحة
  const totalPages = Math.ceil(announcementsData.length / projectsPerPage);

  // المشاريع المعروضة في الصفحة الحالية فقط
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = announcementsData.slice(indexOfFirstProject, indexOfLastProject);

  const handleShowDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // تغيير الصفحة عند الضغط على أزرار الـ Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Dashboard>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Announcements</h1>
        
        {currentProjects.length > 0 ? (
          <div className="row">
            {currentProjects.map((announcement) => (
              <div className="col-md-4 mb-4" key={announcement.id}>
                <Card className="h-100" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                  <Card.Body>
                    <Card.Title>{announcement.projectTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{announcement.customerName}</Card.Subtitle>
                    <Card.Text>
                      {announcement.description.length > 60
                        ? announcement.description.substring(0, 60) + '...'
                        : announcement.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleShowDetails(announcement)}>
                      View Details
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">Date: {announcement.date}</Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p>No announcements available.</p>
        )}

        {/* Pagination Component */}
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex + 1}
              active={pageIndex + 1 === currentPage}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        {/* Modal to show details */}
        {selectedProject && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProject.projectTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Customer Name:</strong> {selectedProject.customerName}</p>
              <p><strong>Supervisor:</strong> {selectedProject.supervisorName}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Date:</strong> {selectedProject.date}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </Dashboard>
  );
}
