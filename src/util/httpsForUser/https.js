import { QueryClient } from "@tanstack/react-query";
//
const API_URL = "http://spcs.somee.com/api";
const token = getToken();
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
  const response = await fetch(`${API_URL}/workgroups/${id}`, {
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
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}
// Get Task By ID
export async function fetchTaskData(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    "Content-Type": "application/json",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching TaskId data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
// Update Task Data
export async function updateTask({ formData, taskid }) {
  const data2 = Object.fromEntries(formData);
  console.log(data2);
  const response = await fetch(`${API_URL}/tasks/${taskid}`, {
    method: "PUT",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the Task");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
// Submit task answer
export async function submitAnswer({ formData, taskid }) {
  const data2 = Object.fromEntries(formData);
  console.log(data2);
  try {
    const response = await fetch(`${API_URL}/tasks/${taskid}/submit-answer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}
// Delete Task
export async function deleteTask(taskid) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error throw deleting task:", error);
    throw error;
  }
}
//* Chat APIs

// GET /api/chat/get-messages
export async function getMessages({ workgroupId }) {
  const response = await fetch(`${API_URL}/chat/${workgroupId}/get-messages`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching messages");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

// POST /api/chat/send
export async function sendMessageToChat({ message, workgroupId }) {
  const response = await fetch(`${API_URL}/chat/${workgroupId}/send`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while sending a message");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

// POST /api/chat/join
export async function joinChat({ workgroupId }) {
  const response = await fetch(`${API_URL}/chat/${workgroupId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while joining the chat");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}

// POST /api/chat/leave
export async function leaveChat(chatData) {
  const token = getToken();
  const response = await fetch(`${API_URL}/chat/leave`, {
    method: "POST",
    body: JSON.stringify(chatData),
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while leaving the chat");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
}
