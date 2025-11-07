import axios from "axios";

const LeaveAPI = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1/leaves`,
    headers: {},
    timeout: 10000
});

LeaveAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
        return Promise.reject({message : "Network Error, Please try again"});
    }
)

export default LeaveAPI;