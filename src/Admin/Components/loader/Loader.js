import axios from 'axios';

// دالة لجلب تفاصيل المستخدم بناءً على معرف المستخدم
export const fetchUserDetails = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data; // إرجاع بيانات المستخدم
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw new Error("Could not fetch user details.");
  }
};

// دالة لجلب تفاصيل المشروع بناءً على معرف المشروع
export const fetchProjectDetails = async (id) => {
  try {
    const response = await axios.get(`/api/projects/${id}`);
    return response.data; // إرجاع بيانات المشروع
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    throw new Error("Could not fetch project details.");
  }
};

// دالة لجلب تفاصيل التقرير بناءً على معرف التقرير
export const fetchReportDetails = async (reportId) => {
  try {
    const response = await axios.get(`/api/reports/${reportId}`);
    return response.data; // إرجاع بيانات التقرير
  } catch (error) {
    console.error("Failed to fetch report details:", error);
    throw new Error("Could not fetch report details.");
  }
};

// دالة لجلب تفاصيل مجموعة العمل بناءً على معرف المجموعة
export const fetchWorkGroupDetails = async (id) => {
  try {
    const response = await axios.get(`/api/workgroups/${id}`);
    return response.data; // إرجاع بيانات مجموعة العمل
  } catch (error) {
    console.error("Failed to fetch workgroup details:", error);
    throw new Error("Could not fetch workgroup details.");
  }
};
