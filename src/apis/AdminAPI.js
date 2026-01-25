import axios from "axios";
import handleExpiredJWT from "../utils/JwtExpirationHandler";

export const AdminAPI = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/admin`,
    timeout : 10000,
    withCredentials : true
})

AdminAPI.interceptors.response.use(
    (response)=> response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            // Timeout
            return Promise.reject({ message: "Request timed out. Please try again." });
        } else if (!error.response) {
            // Network error
            return Promise.reject({ message: "Network Error. Please check your connection." });
        } else if (error.response.status === 401){
            handleExpiredJWT();
        } else {
            // Server responded with an error
            // Return server error message or default to generic
            const message =
                error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
            return Promise.reject({ message });
        }
    }
)