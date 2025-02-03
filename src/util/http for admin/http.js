import { toast } from 'react-toastify';

const API_BASE_URL = 'http://spcs.somee.com/api';
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Please login to get a token.');
      return; // إضافة return للخروج إذا كان التوكن مفقودًا
    }

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

    const data = await response.json();
    console.log("data", data);

    // إذا كانت البيانات موجودة وصحيحة، يتم إرجاعها كما هي
    if (data.result && Array.isArray(data.result)) {
      console.log('Users data:', data.result);
      return data.result;
    } else {
      throw new Error('No valid result data found.');
    }

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

    const url = `http://spcs.somee.com/api/admin/projects`;

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


export const fetchWorkgroups = async () => {
  try {
    const token = localStorage.getItem('token'); // الحصول على التوكن
    if (!token) {
      throw new Error('Token is missing. Please login to get a token.');
    }

    // بناء الرابط مع المعاملات
    const url = `http://spcs.somee.com/api/workgroups`;

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
    
    // التحقق من أن البيانات تحتوي على جميع الحقول المطلوبة
    if (!data.result) {
      throw new Error('No result found in the response');
    }

    console.log("Fetched project details:", data.result); 
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
  console.log("detailId",detailId)
  console.log("detailsData",detailsData)
  console.log("detailsData.title",detailsData.title)
  console.log("detailsData.description",detailsData.description)
  console.log("detailsData.section",detailsData.section)
  // if (!detailId || !detailsData || !detailsData.title || !detailsData.description || !detailsData.section) {
  //   throw new Error('Detail ID, title, description, and section are required');
  // }

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
  if (!detailId || isNaN(detailId)) {
    console.error("Invalid detail ID:", detailId);
    throw new Error('Detail ID must be a valid number');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details/${detailId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer your-auth-token' // إذا كان هناك توثيق
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      throw new Error(errorData.message || 'Failed to delete detail');
    }

    const result = await response.json();
    console.log('Deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const fetchCustomers = async () => {
  const token = localStorage.getItem('token'); // جلب التوكن من التخزين المحلي
  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(
    `http://spcs.somee.com/api/users/customers`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response:", data);

  // التأكد من أن البيانات تأتي من result.customers
  if (data.isSuccess && Array.isArray(data.result.customers)) {
    return data.result.customers || [];  // استخدام customers من result
  } else {
    throw new Error(data.message);
  }
};

export const fetchStudents = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found. Please log in.');
    }

    const response = await fetch(
      `http://spcs.somee.com/api/users/students`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('HTTP error! status:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data); // طباعة الاستجابة كاملة
    console.log('Data result:', data.result); // طباعة نتيجة الاستجابة

    // التحقق من أن data.result.students هو مصفوفة
    if (!data.result || !Array.isArray(data.result.students)) {
      console.error('Unexpected data format:', data.result);
      throw new Error('Unexpected data format from API');
    }

    // تحويل بيانات الطلاب إلى الشكل المطلوب
    const students = data.result.students.map(student => ({
      id: student.id,
      fullName: `${student.firstName} ${student.middleName || ''} ${student.lastName}`,
      email: student.email,
      projects: student.projects && student.projects.length > 0 ? student.projects : [],
    }));

    console.log('Fetched students:', students);
    return students;
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
console.log("data is",data)
    return data.result || [];  // يجب أن تكون البيانات في `data.result` وليس `data.supervisors`

  } catch (error) {
    console.error('Error fetching supervisors:', error);
    return [];  
  }
};

export const fetchRoles = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Authentication token not found. Please log in again.');
    return [];
  }

  try {
    const response = await fetch('http://spcs.somee.com/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching roles: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Roles API response:', data);

    if (data?.result) {
      return Array.isArray(data.result) ? data.result : [data.result];
    } else if (Array.isArray(data)) {
      return data;
    } else {
      console.error('Unexpected API response structure:', data);
      return [];
    }
  } catch (error) {
    console.error('Error in fetchRoles:', error);
    return [];
  }
};

export const assignRoleToUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Authentication token not found.');
    throw new Error('Token not found');
  }

  if (!roleId || !userId) {
    console.error('Role ID or User ID is missing.');
    throw new Error('Role ID or User ID is missing.');
  }

  try {
    const response = await fetch(
      `http://spcs.somee.com/api/roles/${roleId}/assign-to-user/${userId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      const errorMessage = data.message || 'Failed to assign role to user';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Role assigned successfully:', data);
    return data; // لا حاجة لـ toast هنا
  } catch (error) {
    console.error('Error assigning role:', error);
    toast.error(error.message || 'Error assigning role');
    throw error;
  }
};


export const removeRoleFromUser = async ({ roleId, userId }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Authentication token not found.');
    throw new Error('Token not found');
  }

  try {
    const response = await fetch(`http://spcs.somee.com/api/roles/${roleId}/remove-from-user/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      const errorMessage = data.message || 'Error removing role from user';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Role removed successfully:', data);
    return data;
  } catch (error) {
    console.error('Error removing role from user:', error);
    toast.error(error.message || 'Error removing role from user');
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

export const fetchArchivedUsers = async (projectId) => {
  const token = localStorage.getItem('token');
  console.log('Fetching archived users for project ID:', projectId);

  const response = await fetch(
    `http://spcs.somee.com/api/admin/projects/${projectId}/archive/users`,
    {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.log('Failed to fetch data, status:', response.status);
    throw new Error('Failed to fetch archived users');
  }

  const data = await response.json();
  console.log("Fetched Data:", data);  // تحقق من البيانات
  return data;  
};