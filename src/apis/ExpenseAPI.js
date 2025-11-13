import axios from "axios";

export const ExpenseAPI = axios.create({
    baseURL : `${process.env.REACT_APP_SERVER_URL}/api/v1/expenses`,
    headers : {},
    timeout : 10000
});


ExpenseAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject({message : "Network Error, Please try again"});
    }
)