import LeaveAPI from "../apis/LeaveAPI"

export const applyLeave = async(email, requestDto)=>{
    return await LeaveAPI.post("/apply",requestDto,{
        params : {
            email: email
        }
    });
}

export const getEmployeeLeaves = async(email)=>{

    const response = await LeaveAPI.get("get",{
        params : {
            email: email
        }
    });

    return response.data;
}