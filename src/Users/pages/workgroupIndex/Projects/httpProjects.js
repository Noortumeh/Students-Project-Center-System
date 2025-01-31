import { API_BASE_URL } from "../../../../util/http for admin/http";
import { getToken } from "../../../../util/httpsForUser/https";

//
const API_URL = "http://spcs.somee.com/api";
const token = getToken();

// Project Details Header
export const fetchProjectDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}/projects/details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};

// Add Sub Section
export const addSubSection = async (sectionData) => {
    console.log(sectionData)
    try {
        const response = await fetch(`${API_URL}/project-details/${sectionData.sectionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(sectionData.subSectionData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};
// Edit Sub Section
export const updateSubSection = async ({ id, title, description, iconData }) => {
    console.log(id)
    try {
        const response = await fetch(`${API_URL}/project-details/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ title, description, iconData }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};
// Delete Sub Section
export const deleteSubSection = async (id) => {
    console.log(id)
    try {
        const response = await fetch(`${API_URL}/project-details/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};
// Edit Main Section
export const updateSection = async ({ sectionId, newName }) => {
    console.log(sectionId)
    try {
        const response = await fetch(`${API_URL}/project-sections/${sectionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ name: newName }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};
// Delete Main Section
export const deleteSection = async (sectionId) => {
    console.log(sectionId)
    try {
        const response = await fetch(`${API_URL}/project-sections/${sectionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
};
// create Project Section
export const createProjectSection = async (projectId, sectionData) => {
    try {
        const response = await fetch(`${API_URL}/project-sections?projectId=${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(sectionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error creating project section:', error);
        throw error;
    }
};
// update Project Overview
export const updateProjectOverview = async (projectId, overviewData) => {
    console.log(projectId, overviewData)
    try {
        const response = await fetch(`${API_URL}/user/projects/${projectId}/overview?overview=${overviewData}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error update project overview:', error);
        throw error;
    }
};