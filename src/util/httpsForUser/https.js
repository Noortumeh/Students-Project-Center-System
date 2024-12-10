const API_URL = "http://spcs.somee.com/api";

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

  localStorage.setItem("userInfo", JSON.stringify({ user: data.user, role: data.role}));
}
// user API
//* get token
export function getToken() {
  return localStorage.getItem("token");
}
//* get current user information
export function getCurrentUser() {
  let userInfo = localStorage.getItem('userInfo');
  userInfo = JSON.parse(userInfo);
  const token = localStorage.getItem("token");
  return {userInfo, token};
}

///////
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
  console.log(data.result);
  return data;
}

