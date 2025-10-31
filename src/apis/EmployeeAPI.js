import axios from "axios";

const EmployeeApi = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/employees`,
    headers : {},
    timeout : 10000
})

EmployeeApi.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
    }
)

export default EmployeeApi;