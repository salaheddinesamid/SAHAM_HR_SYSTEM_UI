import axios from "axios";
/**
 * 
 */
export const AbsenceAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/absences`,
    headers : {},
    timeout : 10000,
    withCredentials : true
})

AbsenceAPI.interceptors.response.use(
    (response)=> response,
    (error)=> {
        if(error){
            return Promise.reject({message : "Network Error, Please try again"});
        }
    }
)