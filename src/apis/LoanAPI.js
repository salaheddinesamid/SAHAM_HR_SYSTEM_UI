import axios from "axios";

export const LoanAPI = axios.create({
    baseURL : "",
    headers : {},
    timeout : 10000
})

LoanAPI.interceptors.response.use(
    (response)=>response,
    (error)=>{

        switch(error.status){
            case 403:
                return Promise.reject({message : ""});
            case 404:
                return Promise.reject({message : "Employee not found, please make sure the credentials are valid"});
        }
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
        
    }
)