import EmployeeApi from "../apis/EmployeeAPI"

export const getEmployee = async(email)=>{
    const response = await EmployeeApi.get(`/get?email=${email}`);
    return response.data;
}

export const getSubordinates = async(email)=>{
    const response = await EmployeeApi.get("subordinates",{
        params : {
            managerEmail : email
        }
    });

    return response.data;
}