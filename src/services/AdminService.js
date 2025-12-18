import { AdminAPI } from "../apis/AdminAPI"
/**
 * 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export const getAllEmployees = async(page, size)=>{
    const response = await AdminAPI.get("employees/get_all",{
        params : {
            pageNumber : page,
            pageSize : size
        }
    });
    return response.data;
}
/**
 * 
 * @param {*} request 
 * @returns 
 */
export const addEmployee = async(request)=>{
    const res = await AdminAPI.post("/employees/new", request);
    return res.status;
}
/**
 * 
 * @param {*} managerName 
 * @returns 
 */
export const verifyManager = async(managerName)=>{
    const response = await AdminAPI.get("managers/verify", {
        params : {
            fullName : managerName
        }
    });

    return response.data;
}