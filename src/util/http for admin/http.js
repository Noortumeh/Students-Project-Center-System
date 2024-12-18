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
  const response = await fetch('http://spcs.somee.com/api/projects?PageSize=6&PageNumber=1');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('Response Data (GET):', data);
  return data;
};

export const createProject = async (projectData) => {
  const response = await fetch('http://spcs.somee.com/api/projects', {
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