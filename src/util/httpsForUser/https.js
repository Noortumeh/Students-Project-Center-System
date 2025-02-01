import { QueryClient } from "@tanstack/react-query";
//
const API_URL = "http://spcs.somee.com/api";
const token = localStorage.getItem("token");
// Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // منع إعادة المحاولة التلقائية
      refetchOnWindowFocus: false, // منع إعادة الجلب عند التركيز على النافذة
      staleTime: 1000,
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
  // set token
  localStorage.setItem("token", data.token);
  // set user info
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ user: data.user, role: data.role })
  );
  // set expiration time
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  // expiration.setSeconds(expiration.getSeconds() + 90);
  localStorage.setItem("expiration", expiration.toISOString());
}
// user API
//* get token durration
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
//* get token
export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    localStorage.setItem("token", "EXPIRED");
    return "EXPIRED";
  }
  return token;
}
//
export function logout() {
  if (localStorage.getItem("token") && localStorage.getItem("userInfo")) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiration");
  } else {
    const error = new Error("An error occurred while logout");
    throw error;
  }
}
//* get current user information
export function getCurrentUser() {
  const userInfoStr = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");

  if (token === "EXPIRED") {
    logout();
    return;
  }

  if (!userInfoStr || !token) {
    return null;
  }

  try {
    const userInfo = JSON.parse(userInfoStr);
    return { userInfo, token };
  } catch (error) {
    return error;
  }
}
//* Projects APIs
export async function getProjects({ pageSize = 6, pageNumber = 1 }) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/user/projects/get-all-for-user/${pageSize}/${pageNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  if (!response.ok) {
    const error = new Error("An error occurred while fetching Projects");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
//* Supervisor Tasks
export async function getSupervisorTasks() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/tasks/all-supervisor-tasks`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching Supervisor Tasks"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}
//* Workgroup APIs
export async function getWorkgroups({ pageSize = 6, pageNumber = 1 }) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/workgroups/get-all-for-user/${pageSize}/${pageNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  if (!response.ok) {
    const error = new Error("An error occurred while fetching");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}
// Fetch data for each Workgroup:
export async function fetchWorkgroupData(id) {
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
// Change task Status
export async function changeTaskStatus({ taskid, status }) {
  console.log(taskid + status);
  try {
    const response = await fetch(`${API_URL}/tasks/${taskid}/change-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
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

//* Calendar API
// Fetch Calendar events from the API
export async function fetchEvents({ workgroupId }) {
  const response = await fetch(`${API_URL}/celender/${workgroupId}`, {
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
  return data.result;
}

// Add Calendar event to the API
export async function addEvent({ newEvent, workgroupId }) {
  console.log(newEvent);
  const response = await fetch(`${API_URL}/celender/${workgroupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(newEvent),
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
// Edit Calendar event to the API
export async function updatedEvent(event) {
  const response = await fetch(`${API_URL}/celender/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event), // JSON.stringify هنا مهم
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
// Delete Calendar event to the API
export async function deleteEvent(eventId) {
  try {
    const response = await fetch(`${API_URL}/celender/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    const data = await response.json();
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
  return data.result;
}

// POST /api/chat/send
export async function sendMessageToChat({ message, workgroupId }) {
  console.log(message + " " + workgroupId);
  const response = await fetch(`${API_URL}/chat/send-message/${workgroupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(message),
  });
  console.log(response);
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
  console.log(token);
  console.log(workgroupId);
  const response = await fetch(`${API_URL}/chat/join-group/${workgroupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // const data = await response.json();
  // console.log("data")
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
export async function leaveChat({ workgroupId }) {
  const token = getToken();
  const response = await fetch(`${API_URL}/chat/${workgroupId}/leave`, {
    method: "POST",
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
