import { QueryClient } from "@tanstack/react-query";
//
const API_URL = "http://spcs.somee.com/api";
// Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // منع إعادة المحاولة التلقائية
      refetchOnWindowFocus: false, // منع إعادة الجلب عند التركيز على النافذة
      staleTime: 5 * 60 * 1000, // تعيين وقت التقادم (مثال: 5 دقائق)
    },
  },
});

export async function signUp(formData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while signUp");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { data } = await response.json();
  return data;
}

export async function login(formData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while login");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "userInfo",
    JSON.stringify({ user: data.user, role: data.role })
  );
}
// user API
//* get token
export function getToken() {
  return localStorage.getItem("token");
}
//* get current user information
export function getCurrentUser() {
  const userInfoStr = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");

  if (!userInfoStr || !token) {
    return null;
  }

  try {
    const userInfo = JSON.parse(userInfoStr);
    return { userInfo, token };
  } catch (error) {
    return null;
  }
}

export function logout() {
  if (localStorage.getItem("token") && localStorage.getItem("userInfo")) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  } else {
    const error = new Error("An error occurred while logout");
    throw error;
  }
}
//* Workgroup APIs
export async function getWorkgroups() {
  const token = getToken();
  const response = await fetch(`${API_URL}/workgroups/get-all-for-user`, {
    "Content-Type": "application/json",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}
// Fetch data for each Workgroup:
export async function fetchWorkgroupData(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/workgroups/${id}`,{
    "Content-Type": "application/json",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
// Fetch Tasks for workgroup
export async function fetchTasksForworkgroup(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/all-workgroup-tasks/${id}`, {
    "Content-Type": "application/json",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
// Add Task/ createTask
export async function createTask(formData, workgroupId) {
  const token = getToken();
  try {
      const response = await fetch(`${API_URL}/tasks/${workgroupId}`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
          },
          body: formData
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;

  } catch (error) {
      console.error('Error creating task:', error);
      throw error;
  }
};