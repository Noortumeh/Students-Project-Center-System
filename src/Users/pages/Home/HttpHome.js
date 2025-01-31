const API_URL = "http://spcs.somee.com/api";

// Contact section API
export const postContactUs = async (contactData) => {
    try {
        const response = await fetch(`${API_URL}/contact-us/contact-us`, {
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
// Favorites Projects Section
export const getFavoritesProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/projects/favorites`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error sending contact message:', error);
        throw error;
    }
};
// Our Clients Section
export const getOurClients = async () => {
    try {
        const response = await fetch(`${API_URL}/users/our-customers`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error sending contact message:', error);
        throw error;
    }
};