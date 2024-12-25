import axios from 'axios';

// إعداد الأساسيات للتعامل مع الـ API
const API_BASE_URL = 'https://localhost:7206/api'; // استبدل هذا بالرابط الأساسي للـ API الخاص بك

// دالة لتحميل بيانات المستخدم بناءً على الـ ID
export async function fetchUserDetails(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data; // يعيد البيانات إلى اللودر
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details.');
  }
}

// دالة لتحميل بيانات المشروع بناءً على الـ ID
export const fetchProjectDetails = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    console.log('Fetching project details for ID:', projectId); 
    const response = await fetch(`http://spcs.somee.com/api/project-sections?projectId=${projectId}`); 

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching project details:', errorData);
      throw new Error(`Error fetching project details: ${errorData.message || `HTTP error! status: ${response.status}`}`);
    }
    
    const data = await response.json();
    
    // تحقق مما إذا كانت هناك أقسام
    if (!data.result || data.result.length === 0) {
      throw new Error('No sections found for the given project ID.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw new Error(`Failed to fetch project details: ${error.message}`);
  }
};
export async function fetchReportDetails(reportId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/${reportId}`);
    return response.data; // يعيد البيانات إلى اللودر
  } catch (error) {
    console.error('Error fetching report details:', error);
    throw new Error('Failed to fetch report details.');
  }
}

// دالة لتحميل بيانات فرق العمل بناءً على الـ ID
export async function fetchWorkGroupDetails(workGroupId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/workgroups/${workGroupId}`);
    return response.data; // يعيد البيانات إلى اللودر
  } catch (error) {
    console.error('Error fetching workgroup details:', error);
    throw new Error('Failed to fetch workgroup details.');
  }
}
