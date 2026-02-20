import axios from "axios";
import Cookies from "js-cookie";

export const AnalyticsAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/analytics`,
    timeout : 10000,
    withCredentials : true
})
// Configuration of Analytics API requests
AnalyticsAPI.interceptors.request.use(
    (config)=>{
        const accessToken = Cookies.get("accessToken");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=> Promise.reject(error)
    
)

// Handle Analytics API response and error
AnalyticsAPI.interceptors.response.use(
    (response) => response
)