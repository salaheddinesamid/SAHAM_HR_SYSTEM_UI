import axios from "axios";

export const AuthAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/auth`,
    headers : {},
    timeout : 10000
})

AuthAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{

        switch(error.status){
            case 403:
                return Promise.reject({message : "Email or password are invalid"});
            case 404:
                return Promise.reject({message : "User not found, please make sure the credentials are valid"});
        }
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
        
    }
)