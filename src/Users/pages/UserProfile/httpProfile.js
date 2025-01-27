import { getToken } from "../../../util/httpsForUser/https";

//
const API_URL = "http://spcs.somee.com/api";
const token = localStorage.getItem("token");

// Get profile data
export async function getProfileinfo() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/profile/user-info`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching Projects");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data.result;
}

// Put profile info
export async function updateProfileInfo({userInfo}) {
    const response = await fetch(`${API_URL}/profile/user-info`, {
      method : 'PUT',  
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      const error = new Error("An error occurred while updating user info");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    return data.result;
  }
  // Put profile Picture
export async function updateProfilePicture({file}) {
    const response = await fetch(`${API_URL}/profile/profile-image`, {
      method : 'PUT',  
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: file,
    });
    if (!response.ok) {
      const error = new Error("An error occurred while fetching Projects");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const data = await response.json();
    return data.result;
  }
