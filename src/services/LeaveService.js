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
        },
    });

    return response.data;
}

export const getSubordinatesLeaves = async(email)=>{
    const response = await LeaveAPI.get("/subordinates/get_all_requests", {
        params : {
            email : email
        }
    })

    return response.data;
}

// subordinates (Approval/Rejection)
export const approveSubordinatesLeave = async(requestId)=>{
    const response = await LeaveAPI.put("/subordinates/approve-request",null,{
        params : {
            leaveRequestId : requestId
        }
    });
    return response.status;
}

export const rejectSubordinatesLeave = async(requestId)=>{
    const response = await LeaveAPI.put("/subordinates/reject-request",null,{
        params : {
            leaveRequestId : requestId
        }
    });

    return response.status;
}

// Final (Approval/Rejection)

export const finalLeaveApproval = async(requestId)=>{
    const response = await LeaveAPI.put("/approve-request",null,{
        params : {
            requestId : requestId
        }
    });

    return response.status;
}

export const finalLeaveRejection = async(requestId)=>{
    const response = await LeaveAPI.put("reject-request",null,{
        params : {
            requestId : requestId
        }
    });

    return response.status;
}

// Get leave requests In process and approved by Manager
export const getAllRequestsForHr = async()=>{
    const response = await LeaveAPI.get("hr/get_all_requests");
    return response.data;
}