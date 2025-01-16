import { toast } from 'react-toastify';

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

export const fetchProjects = async ({  pageSize, pageNumber }) => {

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    const url = `http://spcs.somee.com/api/admin/projects/${pageSize}/${pageNumber}`;

    const response = await fetch(url, {
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
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message || 'An unknown error occurred.');
    }

    return data;
  } catch (error) {
    console.error('Error toggling favorite project:', error.message);
    throw error;
  }
};


export const fetchWorkgroups = async (pageSize = 6, pageNumber = 1, workgroupName = '') => {
  try {
    const token = localStorage.getItem('token'); // الحصول على التوكن
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    // بناء الرابط مع المعاملات
    const url = `http://spcs.somee.com/api/workgroups/${pageSize}/${pageNumber}?workgroupName=${workgroupName}`;

    const response = await fetch(url, {
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


export const fetchProjectSections = async ({ projectId }) => {
  const token = localStorage.getItem('token');
  if (!token) {
  console.log('token not found');
    
  }

  try {
    const apiUrl = `http://spcs.somee.com/api/project-sections?projectId=${projectId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching project sections:', error.message);
    throw error;
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

export const fetchProjectDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
        Accept: "application/json",  
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();  
    return data;  // ارجع البيانات بشكل مباشر
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};

export const createProjectDetails = async (sectionId, detailsArray) => {
  if (!sectionId || !Array.isArray(detailsArray) || detailsArray.length === 0) {
    throw new Error('Section ID and an array of details are required');
  }

  try {
    const isValid = detailsArray.every(
      (detail) => detail.title && detail.description && detail.iconData
    );

    if (!isValid) {
      throw new Error('Each detail must include title, description, and iconData');
    }

    const response = await fetch(`http://spcs.somee.com/api/project-details/${sectionId}`, {
      method: 'POST',
      headers: addAuthToken({
        'Content-Type': 'application/json',
      }),
      // إرسال المصفوفة كما هي بدون تعديل
      body: JSON.stringify(detailsArray),
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



export const fetchRoles = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    toast.error('Authentication token not found. Please log in again.');
    throw new Error('Token not found');
  }

  const response = await fetch('http://spcs.somee.com/api/roles', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json', 
    },
  });

  if (!response.ok) {
    console.error('Fetch error:', response.status, response.statusText);
    throw new Error(`Error fetching roles: ${response.statusText}`);
  }

  return response.json();
};


export const updateRole = async ({ id, newRoleName }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch(`http://spcs.somee.com/api/roles/${id}?newRoleName=${newRoleName}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  if (!response.ok) {
    throw new Error('Error updating role');
  }
  return response.json();
};

export const createRole = async (roleName) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch('http://spcs.somee.com/api/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ roleName }),
  });
  if (!response.ok) {
    throw new Error('Error creating role');
  }
  return response.json();
};

export const deleteRole = async (id) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch(`http://spcs.somee.com/api/roles/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  if (!response.ok) {
    throw new Error('Error deleting role');
  }
  return response.json();
};

export const assignRoleToUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch(`http://spcs.somee.com/api/roles/${roleId}/assign-to-user?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error assigning role to user');
  }

  return response.json();
};

export const removeRoleFromUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch(`http://spcs.somee.com/api/roles/${roleId}/remove-from-user?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error removing role from user');
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

  console.log('Sending request to update project with ID:', projectid);

  try {
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
        changeOldSupervisorNotes: updatedProject.changeOldSupervisorNotes || '',
        changeOldCustomerNotes: updatedProject.changeOldCustomerNotes || '',
        changeStatusNotes: updatedProject.changeStatusNotes || '',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response (text):', errorText);
      throw new Error('Failed to update project, received non-JSON response');
    }

    // تحقق من نوع المحتوى (Content-Type) للاستجابة
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response but got:', contentType);
      throw new Error('Expected JSON response but received non-JSON data');
    }

    const responseData = await response.json();
    console.log('Project updated successfully:', responseData);
    return responseData;

  } catch (error) {
    console.error('Error during API request:', error.message);

    if (error.message.includes('Failed to update project')) {
      console.error('API Error: The project update failed due to invalid data.');
    } else {
      console.error('Unexpected Error:', error.message);
    }
    throw error;  
  }
};






export const fetchRoleData = async (role) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is missing. Please log in again.');
  }
  try {
    const response = await fetch(`http://spcs.somee.com/api/users/role/${role}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Authorization': `Bearer YOUR_TOKEN_HERE`, 
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching role data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === 'Unauthorized') {
      toast.error('Unauthorized access. Please check your credentials.');
    } else {
      toast.error('An error occurred while fetching the role data.');
    }
    throw new Error('Error fetching role data');
  }
};