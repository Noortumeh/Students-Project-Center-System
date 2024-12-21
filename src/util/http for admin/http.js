export const fetchSupervisors = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/supervisors');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Supervisors:', data);
    return data.result.map((user) => ({
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }));
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    throw error;
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users?PageSize=6&PageNumber=1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Customers:', data);
    return data.result.map((user) => ({
      value: user.id,
      label: user.userName,
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  const response = await fetch('http://spcs.somee.com/api/admin/projects?PageSize=6&PageNumber=1');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('Response Data (GET):', data);
  return data;
};

export const createProject = async (projectData) => {
  const response = await fetch('http://spcs.somee.com/api/admin/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('Response Data (POST):', data);
  return data;
};

export const fetchWorkgroups = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/workgroups?PageSize=6&PageNumber=1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('New Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching new data:', error);
    throw error;
  }
};

export const fetchStatistics = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/statistics');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Statistics:', data);
    return data.result; 
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

export const fetchStudents = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/students/active?PageSize=6&PageNumber=1');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Students:', data);

    if (data.result && Array.isArray(data.result)) {
      return data.result.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        middleName: user.name.split(' ')[1] || '',
        lastName: user.name.split(' ')[2] || '',
        email: user.email,
        workgroup: 'BSIT',
        phone: user.phone || 'N/A'
      }));
    } else {
      console.error('Unexpected data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchTerms = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/terms');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Terms:', data);
    return data;
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

export const postTerm = async (termData) => {
  try {
    const response = await fetch('http://spcs.somee.com/api/terms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(termData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Term created/updated:', data);
    return data;
  } catch (error) {
    console.error('Error creating/updating term:', error);
    throw error;
  }
};

export const deleteTerm = async (id) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/terms?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Term ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting term ${id}:`, error);
    throw error;
  }
};