import { toast } from 'react-toastify';

const API_BASE_URL = 'http://spcs.somee.com/api';
const token = localStorage.getItem('token');
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Please login to get a token.');
      throw new Error('Token is missing. Please login to get a token.');
    }

    console.log('Token found:', token);

    const response = await fetch('http://spcs.somee.com/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response received:', response);

    if (!response.ok) {
      console.error('HTTP error occurred. Parsing error data...');
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unauthorized'}`);
    }

    console.log('Parsing response data...');
    const data = await response.json();
    console.log('API Response:', data); // تحقق من البيانات

    // تحويل البيانات إلى الشكل المطلوب
    if (data.result && Array.isArray(data.result)) {
      console.log('Processing data.result as an array...');
      const formattedUsers = data.result.map((user) => ({
        id: user.id,
        firstName: user.fullName.split(' ')[0], // افترضنا أن الاسم الكامل يحتوي على الاسم الأول والأخير
        lastName: user.fullName.split(' ')[1] || '', // إذا لم يكن هناك اسم أخير، نعطي قيمة فارغة
        email: user.email,
        role: user.role,
      }));

      console.log('Formatted users:', formattedUsers);
      return formattedUsers;
    }

    return [];
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('An error occurred while fetching users: ' + error.message);
  }
};
export const fetchProjects = async ({ pageSize, pageNumber, filters }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    let url = `http://spcs.somee.com/api/admin/projects/${pageSize}/${pageNumber}`;

    const queryParams = [];
    if (filters.filterType === 'projectName' && filters.filterValue) {
      queryParams.push(`projectName=${encodeURIComponent(filters.filterValue)}`);
    }
    if (filters.projectStatus !== 'all') {
      queryParams.push(`projectStatus=${encodeURIComponent(filters.projectStatus)}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

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
    console.log('API Response:', data);

    // إذا لم توجد مشاريع، نعيد بيانات صحيحة مع قائمة فارغة
    if (!data.isSuccess || !data.result.projects) {
      return {
        isSuccess: true,
        result: {
          projects: [],
          totalCount: 0,
        },
      };
    }

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
    throw new Error('Token is missing. Please login to get a token.');
  }

  try {
    const apiUrl = `${API_BASE_URL}/project-sections?projectId=${projectId}`;
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
  if (!projectId || !sectionData || !sectionData.name) {
    throw new Error('Project ID and section name are required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/project-sections?projectId=${projectId}`, {
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
    const response = await fetch(`${API_BASE_URL}/project-sections/${sectionId}`, {
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
    const response = await fetch(`${API_BASE_URL}/project-sections/${sectionId}`, {
      method: 'DELETE',
      headers: addAuthToken({
        'Accept': 'text/plain', 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const textData = await response.text();
    return textData; 
  } catch (error) {
    console.error('Error deleting project section:', error);
    throw error;
  }
};

export const fetchProjectDetails = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is missing. Please login to get a token.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/projects/details/${id}`, {
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
    console.log("Fetched project details:", data); 
    return data.result; 
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};


export const createProjectDetails = async (sectionId, detailsData) => {
  console.log("sectionId:", sectionId); // طباعة sectionId للتحقق
  console.log("detailsData:", detailsData); // طباعة detailsData للتحقق

  if (!sectionId || !detailsData) {
    throw new Error('Section ID and details data are required');
  }

  try {
    // تحضير requestBody بما يتوافق مع توقعات الخادم
    const requestBody = detailsData.map(detail => ({
      title: detail.title,
      description: detail.description,
      iconData: detail.iconData ? btoa(detail.iconData) : null, // تحويل iconData إلى Base64 إذا كانت موجودة
    }));

    console.log("requestBody:", requestBody); // طباعة requestBody للتحقق

    const response = await fetch(`${API_BASE_URL}/project-details/${sectionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(requestBody), // إرسال requestBody كمصفوفة
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData); // طباعة تفاصيل الخطأ من الخادم
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const textData = await response.text();
    return textData;
  } catch (error) {
    console.error('Error creating project details:', error);
    throw error;
  }
};
export const updateProjectDetails = async (detailId, detailsData) => {
  if (!detailId || !detailsData || !detailsData.title || !detailsData.description || !detailsData.section) {
    throw new Error('Detail ID, title, description, and section are required');
  }

  try {
    const updatedData = {
      title: detailsData.title,
      description: detailsData.description,
      section: detailsData.section, // إضافة الحقل المطلوب
      iconData: detailsData.iconData ? btoa(detailsData.iconData) : "defaultIcon", // تحويل iconData إلى base64 إذا كان string
    };

    console.log('Updating detail with:', updatedData); // تحقق من البيانات

    const response = await fetch(`${API_BASE_URL}/project-details/${detailId}`, {
      method: 'PUT',
      headers: addAuthToken({
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      }),
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update detail: ${response.status}`);
    }

    const textData = await response.text();
    return textData;
  } catch (error) {
    console.error('Error updating project details:', error);
    throw error;
  }
};

export const deleteProjectDetails = async (detailId) => {
  if (!detailId) {
    throw new Error('Detail ID is required');
  }

  try {
    console.log('Deleting detail with ID:', detailId); // تحقق من ID

    const response = await fetch(`${API_BASE_URL}/project-details/${detailId}`, {
      method: 'DELETE',
      headers: addAuthToken({
        'Accept': 'text/plain',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete detail: ${response.status}`);
    }

    const textData = await response.text();
    return textData;
  } catch (error) {
    console.error('Error deleting project details:', error);
    throw error;
  }
};

export const fetchCustomers = async (pageSize = 6, pageNumber = 1) => {
  try {
    const response = await fetch(
      `http://spcs.somee.com/api/users/customers/${pageSize}/${pageNumber}`,
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

    return data.result?.customers || [];  // يجب أن تكون البيانات في `data.result.customers`
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchStudents = async (pageSize, pageNumber) => {
  try {
    console.log('Fetching students with pageSize:', pageSize, 'and pageNumber:', pageNumber); // جملة طباعة قبل الطلب

    const response = await fetch(
      `http://spcs.somee.com/api/users/students/${pageSize}/${pageNumber}`,
      {
        headers: addAuthToken(),
      }
    );

    if (!response.ok) {
      console.error('HTTP error! status:', response.status); // جملة طباعة في حالة الخطأ
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data); // جملة طباعة لعرض البيانات المستلمة من الخادم

    if (!data.isSuccess) {
      console.error('API error:', data.message); // جملة طباعة في حالة خطأ من الخادم
      throw new Error(data.message);
    }

    console.log('Fetched students:', data.result.students); // جملة طباعة لعرض الطلاب المستلمين
    return Array.isArray(data.result.students) ? data.result.students : [];
  } catch (error) {
    console.error('Error fetching students:', error); // جملة طباعة في حالة حدوث استثناء
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

    return data.result || [];  // يجب أن تكون البيانات في `data.result` وليس `data.supervisors`

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

  try {
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

    const data = await response.json();
    console.log('API Response:', data);

    if (data.isSuccess && data.result) {
      return Array.isArray(data.result) ? data.result : [data.result];
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error('Error in fetchRoles:', error);
    throw error;
  }
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

  const data = await response.json();
  return data.result || []; // تعديل بناءً على هيكل الاستجابة
};

export const createRole = async (roleName) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await fetch(`http://spcs.somee.com/api/roles?roleName=${roleName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error creating role');
  }

  const data = await response.json();
  return data.result || []; // تعديل بناءً على هيكل الاستجابة
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

  const data = await response.json();
  return data.result || []; // تعديل بناءً على هيكل الاستجابة
};

export const assignRoleToUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/roles/${roleId}/assign-to-user?userId=${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error assigning role to user');
    }

    return response.json();
  } catch (error) {
    console.error('Error assigning role to user:', error);
    throw error;
  }
};

export const removeRoleFromUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/roles/${roleId}/remove-from-user?userId=${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error removing role from user');
    }

    return response.json();
  } catch (error) {
    console.error('Error removing role from user:', error);
    throw error;
  }
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
  console.log("updated project",updatedProject);
  
    const response = await fetch(`http://spcs.somee.com/api/admin/projects/${projectid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify(
        updatedProject
      ),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response (text):', errorText);
      throw new Error('Failed to update project, received non-JSON response');
    }
    const responseData = await response.json();
    console.log('Project updated successfully:', responseData);
    return responseData;
};

export const fetchRoleData = async (role) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is missing. Please log in again.');
  }
  try {
    const response = await fetch(`http://spcs.somee.com/api/roles?role=${role}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching role data');
    }

    const data = await response.json();
    return data.result?.customers || []; 
  } catch (error) {
    if (error.message === 'Unauthorized') {
      toast.error('Unauthorized access. Please check your credentials.');
    } else {
      toast.error('An error occurred while fetching the role data.');
    }
    throw new Error('Error fetching role data');
  }
};