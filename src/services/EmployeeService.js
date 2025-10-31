import EmployeeApi from "../apis/EmployeeAPI"

export const getEmployee = async(email)=>{
    try{
        const response = await EmployeeApi.get(`/get?email=${email}`);
        return response.data;
    }
    catch(err){

    }
}