import EmployeeApi from "../apis/EmployeeAPI"
/**
 * Fetch employee details.
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getEmployee = async(email)=>{
    const response = await EmployeeApi.get(`/get?email=${email}`);
    return response.data;
}
/**
 * Fetch manager's subordinates.
 * @param {*} email 
 * @returns 
 */
export const getSubordinates = async(email)=>{
    const response = await EmployeeApi.get("subordinates",{
        params : {
            managerEmail : email
        }
    });
    return response.data;
}