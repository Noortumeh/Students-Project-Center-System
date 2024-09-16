import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

function CreateWorkGroup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [workgroupName, setWorkgroupName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // استرجاع البيانات من location.state بعد العودة من الصفحات
    if (location.state && location.state.selectedCustomer) {
      setSelectedCustomer(location.state.selectedCustomer);
    }
    if (location.state && location.state.selectedSupervisor) {
      setSelectedSupervisor(location.state.selectedSupervisor);
    }
    if (location.state && location.state.selectedStudents) {
      setSelectedStudents(location.state.selectedStudents);
    }
  }, [location.state]);

  const handleSelectCustomer = () => {
    navigate('/workgroup/SelectCustomer', { state: { workgroupName, selectedSupervisor, selectedStudents } });
  };

  const handleSelectSupervisor = () => {
    navigate('/workgroup/SelectSupervisor', { state: { workgroupName, selectedCustomer, selectedStudents } });
  };

  const handleSelectStudent = () => {
    navigate('/workgroup/SelectStudent', { state: { workgroupName, selectedCustomer, selectedSupervisor } });
  };

  const handleSave = () => {
    if (!workgroupName || !selectedCustomer || !selectedSupervisor || selectedStudents.length < 1) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    // محاكاة عملية الحفظ
    setTimeout(() => {
      setLoading(false);
      toast.success("Workgroup created successfully");
      navigate('/workgroup/WorkGroup');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h1>Create Workgroup</h1>
      <div className="card p-4">
        <h3 className="mb-4">Create</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Workgroup Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workgroup name"
              value={workgroupName}
              onChange={(e) => setWorkgroupName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Button variant="primary" onClick={handleSelectCustomer}>
              {selectedCustomer ? `Selected: ${selectedCustomer}` : 'Select Customer'}
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Supervisor</Form.Label>
            <Button variant="primary" onClick={handleSelectSupervisor}>
              {selectedSupervisor ? `Selected: ${selectedSupervisor}` : 'Select Supervisor'}
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            {selectedStudents.map((student, index) => (
              <Button key={index} variant="primary" className="mb-2 me-2">
                {student}
              </Button>
            ))}
            <Button variant="primary" onClick={handleSelectStudent}>
              Select Students
            </Button>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={() => navigate('/workgroup/WorkGroup')}>Cancel</Button>
            <Button variant="success" onClick={handleSave} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Save Workgroup'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateWorkGroup;
