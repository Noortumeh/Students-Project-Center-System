export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unauthorized'}`);
    }

    const data = await response.json();
    return data.result.map(user => ({
      id: user.id,
      label: user.fullName,
      value: user.id,
      isSupervisor: user.role.includes('supervisor'),
    }));
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('An error occurred while fetching users: ' + error.message);
  }
};


export const fetchProjects = async () => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/admin/projects?PageSize=6&PageNumber=1', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Projects:', data);

    return data;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/admin/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
  } catch (error) {
    console.error('Error creating project:', error.message);
    throw error;
  }
};

export const setFavoriteProject = async (projectId) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch(`http://spcs.somee.com/api/admin/projects/favorites/${projectId}/toggle`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message || 'Unknown error occurred.');
    }

    return data;
  } catch (error) {
    console.error('Error setting favorite project:', error.message);
    throw error;
  }
};

export const fetchWorkgroups = async () => {
  try {
    const token = localStorage.getItem('token'); // الحصول على التوكن
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/workgroups?PageSize=6&PageNumber=1', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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
    const token = localStorage.getItem('token'); // الحصول على التوكن
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/users/statistics', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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

export const fetchTerms = async () => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/terms', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Terms:', data);

    return {
      ...data,
      result: data.result || [],
    };
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

export const postTerm = async (termData) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const response = await fetch('http://spcs.somee.com/api/terms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'text/plain',
      },
      body: JSON.stringify(termData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating term:', error);
    throw error;
  }
};

export const putTerm = async (term) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    if (!term.id) {
      throw new Error('Term ID is missing.');
    }

    console.log('Sending data:', JSON.stringify(term.termData));
    console.log("id is a",term.id);
    const response = await fetch(`http://spcs.somee.com/api/terms/${term.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(term.termData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error response:', errorData);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Update successful:', data);
    return data;
  } catch (error) {
    console.error('Error updating term:', error);
    throw error;
  }
};



export const deleteTerm = async (id) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const url = `http://spcs.somee.com/api/terms/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Delete failed:', errorData);
      return { success: false, message: errorData.errors || errorData.message };
    }

    const responseData = await response.json();
    console.log('Delete successful:', responseData);
    return { success: true, message: responseData.message };
  } catch (error) {
    console.error('Error deleting term:', error.message);
    throw error;
  }
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const addAuthToken = (headers = {}) => {
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const postContactUs = async (contactData) => {
  try {
    const response = await fetch('http://spcs.somee.com/api/contact-us/contact-us', {
      method: 'POST',
      headers: addAuthToken({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Contact message sent:', data);
    return data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

export const fetchProjectSections = async (projectId) => {
  try {
    console.log('Project ID received:', projectId);

    if (!projectId) {
      throw new Error('Project ID is required');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const apiUrl = `http://spcs.somee.com/api/project-sections?projectId=${projectId}`;

    console.log('Fetching project sections for project ID:', projectId);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching project sections:', errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.result) {
      throw new Error(data.message || 'No sections found for the given project ID.');
    }

    console.log('Fetched project sections:', data.result);

    return data.result;
  } catch (error) {
    console.error('Error fetching project sections:', error.message);
    throw new Error(`Failed to fetch project sections: ${error.message}`);
  }
};

export const createProjectSection = async (projectId, sectionData) => {
  console.log("section data is.", sectionData);
  if (!projectId || !sectionData || !sectionData.name) {
    throw new Error('Project ID and section name are required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections?projectId=${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(sectionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project section:', error);
    throw error;
  }
};


export const updateProjectSection = async (sectionId, sectionData) => {
  if (!sectionId || !sectionData || !sectionData.name) {
    throw new Error('Section ID and section name are required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections/${sectionId}`, {
      method: 'PUT',
      headers: addAuthToken({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(sectionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project section:', error);
    throw error;
  }
};

export const deleteProjectSection = async (sectionId) => {
  if (!sectionId) {
    throw new Error('Section ID is required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections/${sectionId}`, {
      method: 'DELETE',
      headers: addAuthToken({
        'Accept': 'text/plain',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project section:', error);
    throw error;
  }
};

export const createProjectDetails = async (sectionId, detailsData) => {
  if (!sectionId || !detailsData || !detailsData.title || !detailsData.description) {
    throw new Error('Section ID, title, and description are required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details?sectionId=${sectionId}`, {
      method: 'POST',
      headers: addAuthToken({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(detailsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project details:', error);
    throw error;
  }
};

export const updateProjectDetails = async (detailId, detailsData) => {
  if (!detailId || !detailsData || !detailsData.title || !detailsData.description) {
    throw new Error('Detail ID, title, and description are required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details/${detailId}`, {
      method: 'PUT',
      headers: addAuthToken({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(detailsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project details:', error);
    throw new Error(`Failed to update project details: ${error.message}`);
  }
};

export const deleteProjectDetails = async (detailId) => {
  if (!detailId) {
    throw new Error('Detail ID is required');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details/${detailId}`, {
      method: 'DELETE',
      headers: addAuthToken({
        'Accept': 'text/plain',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project details:', error);
    throw error;
  }
};

export const fetchCustomers = async (pageSize = 6, pageNumber = 1) => {
  try {
    const response = await fetch(
      `http://spcs.somee.com/api/users/customers?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      {
        headers: addAuthToken(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    return data.result || []; 
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchStudents = async (pageSize, pageNumber) => {
  try {
    const response = await fetch(
      `http://spcs.somee.com/api/users/students?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      {
        headers: addAuthToken(),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    return Array.isArray(data.result) ? data.result : [];
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchSupervisors = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/supervisors', {
      headers: addAuthToken(),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    return data.supervisors || [];  

  } catch (error) {
    console.error('Error fetching supervisors:', error);
    return [];  
  }
};

const addAuthHeader = (headers = {}) => {
  const token = getAuthToken();
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  return headers;
};

export const fetchRoles = async () => {
  const response = await fetch('http://spcs.somee.com/api/roles', {
    headers: addAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }
  return response.json();
};

export const updateRole = async ({ id, newRoleName }) => {
  const response = await fetch(`http://spcs.somee.com/api/roles/${id}?newRoleName=${newRoleName}`, {
    method: 'PUT',
    headers: addAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Error updating role');
  }
  return response.json();
};

export const createRole = async (roleName) => {
  const response = await fetch('http://spcs.somee.com/api/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(),
    },
    body: JSON.stringify({ roleName }),
  });
  if (!response.ok) {
    throw new Error('Error creating role');
  }
  return response.json();
};

export const deleteRole = async (id) => {
  const response = await fetch(`http://spcs.somee.com/api/roles/${id}`, {
    method: 'DELETE',
    headers: addAuthHeader(),
  });
  if (!response.ok) {
    throw new Error('Error deleting role');
  }
  return response.json();
};


export const fetchChatMessages = async (workgroupName) => {
  if (!workgroupName) {
    throw new Error('Workgroup name is required');
  }

  const response = await fetch(`http://spcs.somee.com/api/chat/get-messages?workgroupName=${workgroupName}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching chat messages: ${errorData.message || `HTTP error! status: ${response.status}`}`);
  }

  return response.json();
};

export const sendChatMessage = async (workgroupName, message) => {
  const response = await fetch('http://spcs.somee.com/api/chat/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workgroupName, message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error sending chat message: ${errorData.message || `HTTP error! status: ${response.status}`}`);
  }

  return response.json();
};

export const joinChat = async (workgroupName) => {
  const response = await fetch('http://spcs.somee.com/api/chat/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workgroupName }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Error joining chat: ${errorData || `HTTP error! status: ${response.status}`}`);
  }

  return response.json();
};

export const leaveChat = async (workgroupName) => {
  const response = await fetch('http://spcs.somee.com/api/chat/leave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workgroupName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error leaving chat: ${errorData.message || `HTTP error! status: ${response.status}`}`);
  }

  return response.json();
};


export const updateProject = async ({ projectid, updatedProject }) => {
  if (!projectid) {
    throw new Error('Project ID is missing!');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is missing. Please log in again.');
  }

  const response = await fetch(`http://spcs.somee.com/api/admin/projects/${projectid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updatedProject.name,
      supervisorId: updatedProject.supervisorId || null,
      customerId: updatedProject.customerId || null,
      status: updatedProject.status,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.message || 'Failed to update project');
  }

  return response.json();
};
