import { getToken } from "../../../util/httpsForUser/https";

const API_URL = "http://spcs.somee.com/api";

const token = getToken();
// forget passowrd send email
export async function forgetPassword({ email }) {
    console.log(email);
    const response = await fetch(`${API_URL}/auth/send-reset-code/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
// reset forgotten password
export async function resetForgottenPassword({ email, data }) {
    const response = await fetch(
        `${API_URL}/auth/reset-forgotten-password/${email}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const error = new Error("An error occurred while signUp");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const { resData } = await response.json();
    return resData;
}
// reset password from profile page
export async function resetPasswordProfile({ data }) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = new Error("An error occurred while signUp");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const { resData } = await response.json();
    return resData;
}
//