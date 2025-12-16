import axios from "axios";
import Cookies from "js-cookie";
import handleExpiredJWT from "../utils/JwtExpirationHandler";
/**
 * Axios instance for Absence API
 */
export const AbsenceAPI = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/absences`,
    timeout: 10000, // 10 seconds
    withCredentials: true,
});

// Request interceptor to attach token if available
AbsenceAPI.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken"); // or your auth storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
AbsenceAPI.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.code === "ECONNABORTED") {
            // Timeout
            return Promise.reject({ message: "Request timed out. Please try again." });
        } else if (!error.response) {
            // Network error
            return Promise.reject({ message: "Network Error. Please check your connection." });
        } else if (error.response.data.errorCode === "JWT_EXPIRED"){
            handleExpiredJWT();
        } else {
            // Server responded with an error
            // Return server error message or default to generic
            const message =
                error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
            return Promise.reject({ message });
        }
    }
);
