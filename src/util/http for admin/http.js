export const fetchUsers = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.result.map(user => ({
      id: user.id,
      label: user.fullName,
      value: user.id,
      isSupervisor: user.role.includes('supervisor'), // تحديد إذا كان المستخدم مشرفًا
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  const response = await fetch('http://spcs.somee.com/api/admin/projects?PageSize=6&PageNumber=1');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('Response Data (GET):', data);
  return data;
};

export const createProject = async (projectData) => {
  const response = await fetch('http://spcs.somee.com/api/admin/projects', {
    method: 'POST',
    headers: {
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
};

export const setFavoriteProject = async (projectId) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/admin/projects/favorites/${projectId}/toggle`, {
      method: 'PUT', // استخدام PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    return data; 
  } catch (error) {
    console.error('Error setting favorite project:', error);
    throw error;
  }
};
export const fetchWorkgroups = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/workgroups?PageSize=6&PageNumber=1');
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
    const response = await fetch('http://spcs.somee.com/api/users/statistics');
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
    const response = await fetch('http://spcs.somee.com/api/terms');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Terms:', data);
    
    return {
      ...data,
      result: data.result || [], // إرجاع مصفوفة فارغة إذا كانت النتيجة null
    };
  } catch (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }
};

export const postTerm = async (termData) => {
  try {
    const existingTerms = await fetchTerms();
    const existingTerm = Array.isArray(existingTerms.result) ? 
      existingTerms.result.find(term => term.title === termData.title) : null;

    if (existingTerm) {
      // إذا كان الشرط موجودًا، قم بتحديثه
      const response = await fetch(`http://spcs.somee.com/api/terms/${existingTerm.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(termData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Term updated:', data);
      return data;
    } else {
      // إذا لم يكن موجودًا، قم بإنشائه
      const response = await fetch('http://spcs.somee.com/api/terms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(termData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Term created:', data);
      return data;
    }
  } catch (error) {
    console.error('Error creating/updating term:', error);
    throw error;
  }
};

export async function deleteTerm(id) {
  const url = `http://spcs.somee.com/api/terms/${id}`; 
  const response = await fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      // Handle the error based on the response status
      const errorData = await response.json();
      console.error('Delete failed:', errorData);
      return { success: false, message: errorData.errors || errorData.message };
  }

  const responseData = await response.json();
  console.log('Delete successful:', responseData);
  return { success: true, message: responseData.message };
}
export const postContactUs = async (contactData) => {
  try {
    const response = await fetch('http://spcs.somee.com/api/contact-us/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
export const fetchProjectDetails = async (projectId) => {
  try {
    console.log('Fetching project details for ID:', projectId); 
    const response = await fetch(`http://spcs.somee.com/api/project-sections?projectId=${projectId}`); 
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching project details: ${errorData.message || `HTTP error! status: ${response.status}`}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw new Error(`Failed to fetch project details: ${error.message}`);
  }
};
export const createProjectSection = async (projectId, sectionData) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections?projectId=${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
// util/http.js
export const updateProjectSection = async (sectionId, sectionData) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections/${sectionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Error updating project section:', error);
    throw error;
  }
};
// util/http.js
export const deleteProjectSection = async (sectionId) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-sections/${sectionId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project section:', error);
    throw error;
  }
};
// util/http.js
export const createProjectDetails = async (sectionId, detailsData) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details?sectionId=${sectionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detailsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project details:', error);
    throw error;
  }
};

// util/http.js
export const updateProjectDetails = async (detailId, detailsData) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details/${detailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detailsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating project details:', error);
    throw new Error(`Failed to update project details: ${error.message}`);
  }
};

export const deleteProjectDetails = async (detailId) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/project-details/${detailId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting project details:', error);
    throw error;
  }
};


export const fetchCustomers = async (pageSize = 6, pageNumber = 1) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/users/customers?PageSize=${pageSize}&PageNumber=${pageNumber}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};


export const fetchStudents = async (pageSize = 6, pageNumber = 1) => {
  try {
    const response = await fetch(`http://spcs.somee.com/api/users/students?PageSize=${pageSize}&PageNumber=${pageNumber}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchSupervisors = async () => {
  try {
    const response = await fetch('http://spcs.somee.com/api/users/supervisors');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.isSuccess) {
      throw new Error(data.message);
    }

    
  } catch (error) {
    console.error('Error fetching supervisors:', error);
    throw error;
  }
};