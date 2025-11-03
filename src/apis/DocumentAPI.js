import axios from "axios";

export const DocumentAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/documents`,
    headers : {},
    timeout : 10000
})

DocumentAPI.interceptors.response.use(
    (reponse)=>reponse,
    (error)=>{
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
    }
)