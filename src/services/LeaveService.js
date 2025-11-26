import LeaveAPI from "../apis/LeaveAPI"

// handle new leave request
export const applyLeave = async(email, requestDto)=>{
    return await LeaveAPI.post("/apply",requestDto,{
        params : {
            email: email
        }
    });
}

// handle cancel leave request
export const cancelLeaveRequest = async(id)=>{
    return await LeaveAPI.delete("cancel-request",{
        params : {
            leaveRequestId : id
        }
    })
}

// handle cancel leave:
export const cancelLeave = async(id)=>{
    return await LeaveAPI.delete("cancel", {
        params : {
            leaveId : id
        }
    })
}

// Fetch all employee leave requests
export const getMyLeaveRequests = async(email)=>{
    const response = await LeaveAPI.get("/requests/get",{
        params : {
            email: email
        },
    });
    return response.data;
}

// Fetch leave requests of manager's subordinates
export const getSubordinatesLeaveRequests = async(email)=>{
    const response = await LeaveAPI.get("/requests/subordinates/get_all", {
        params : {
            email : email
        }
    })
    return response.data;
}
export const getMyTeamLeaves = async(email)=>{
    const response = await LeaveAPI.get("'")
}

// subordinates (Approval/Rejection)
export const approveSubordinatesLeave = async(email, requestId)=>{
    const response = await LeaveAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy : email,
            leaveRequestId : requestId
        }
    });
    return response.status;
}

export const rejectSubordinatesLeave = async(requestId)=>{
    const response = await LeaveAPI.put("/requests/subordinates/reject-request",null,{
        params : {
            leaveRequestId : requestId
        }
    });
    return response.status;
}

// Final (Approval/Rejection)

export const finalLeaveApproval = async(requestId)=>{
    const response = await LeaveAPI.put("/requests/approve-request",null,{
        params : {
            leaveRequestId : requestId
        }
    });

    return response.status;
}

export const finalLeaveRejection = async(requestId)=>{
    const response = await LeaveAPI.put("/requests/reject-request",null,{
        params : {
            requestId : requestId
        }
    });
    return response.status;
}

// Get leave requests In process and approved by Manager
export const getAllRequestsForHr = async()=>{
    const response = await LeaveAPI.get("/requests/hr/get_all");
    return response.data;
}

// Get all employee leaves:
export const getAllMyLeaves = async(email)=>{
    const response = await LeaveAPI.get("/employee-leaves/get_all", {
        params : {
            email : email
        }
    });
    return response.data;
}