import EmployeeApi from "../apis/EmployeeAPI"
/**
 * Fetch employee details.
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getEmployee = async(token, email)=>{
    const response = await EmployeeApi.get(`/get?email=${email}`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}
/**
 * Fetch manager's subordinates.
 * @param {*} email 
 * @returns 
 */
export const getSubordinates = async(token,email)=>{
    const response = await EmployeeApi.get("subordinates",{
        params : {
            managerEmail : email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}