const API_URL = "http://spcs.somee.com/api";

// Confirm Email when register
export async function confirmEmail({ token, id, apiEndpoint }) {
    console.log(token);
    console.log(id);
    const response = await fetch(
        `${API_URL}${apiEndpoint}?userId=${id}&token=${token}`,
        {
            // method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    if (!response.ok) {
        const error = new Error("An error occurred while signUp");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const { data } = await response.json();
    return data;
}

// forget passowrd send email
export async function forgetPassword({ email }) {
    const response = await fetch(
        `${API_URL}auth/send-reset-password-link/${email}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
    );
    if (!response.ok) {
        const error = new Error("An error occurred while signUp");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const { data } = await response.json();
    return data;
}
