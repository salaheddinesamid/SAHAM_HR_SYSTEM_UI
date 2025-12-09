import LeaveAPI from "../apis/LeaveAPI"

/**
 * Apply new leave request.
 * @param {*} token 
 * @param {*} email 
 * @param {*} requestDto 
 * @returns 200 OK if the request succeed.
 */
export const applyLeave = async(email, requestDto)=>{
    return await LeaveAPI.post("/apply",requestDto,{
        params : {
            email: email
        }
    });
}

/**
 * Cancel leave by the HR.
 * @param {*} token 
 * @param {*} referenceNumber 
 * @returns 
 */
export const cancelLeave = async(referenceNumber)=>{
    return await LeaveAPI.delete("cancel", {
        params : {
            refNumber : referenceNumber
        }
    })
}
/**
 * Cancel leave request by the manager.
 * @param {*} token 
 * @param {*} refNumber 
 * @returns 
 */
export const cancelLeaveRequest = async(refNumber)=>{
    return await LeaveAPI.put("cancel-request", null, {
        params : {
            refNumber : refNumber
        }
    })
}
/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getMyLeaveRequests = async(email)=>{
    const response = await LeaveAPI.get("/requests/get",{
        params : {
            email: email
        }
    });
    return response.data;
}

/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getSubordinatesLeaveRequests = async(email)=>{
    const response = await LeaveAPI.get("/requests/subordinates/get_all", {
        params : {
            email : email
        }
    })
    return response.data;
}
export const getMyTeamLeaves = async(token, email)=>{
    const response = await LeaveAPI.get("'")
}

/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @param {*} requestId 
 * @returns 
 */
export const approveSubordinatesLeave = async(email, requestId)=>{
    const response = await LeaveAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy : email,
            leaveRequestId : requestId
        }
    });
    return response.status;
}

/**
 * 
 * @param {*} token 
 * @param {*} requestId 
 * @param {*} managerEmail 
 * @returns 
 */
export const rejectSubordinatesLeave = async(requestId, managerEmail)=>{
    const response = await LeaveAPI.put("/requests/subordinates/reject-request",null,{
        params : {
            rejectedBy : managerEmail,
            leaveRequestId : requestId
        }
    });
    return response.status;
}

/**
 * 
 * @param {*} token 
 * @param {*} requestId 
 * @returns 
 */
export const finalLeaveApproval = async(requestId)=>{
    const response = await LeaveAPI.put("/requests/approve-request",null,{
        params : {
            leaveRequestId : requestId
        }
    });

    return response.status;
}
/**
 * 
 * @param {*} token 
 * @param {*} requestId 
 * @returns 
 */
export const finalLeaveRejection = async(requestId)=>{
    const response = await LeaveAPI.put("/requests/reject-request",null,{
        params : {
            requestId : requestId
        }
    });
    return response.status;
}

/**
 * 
 * @param {*} token 
 * @returns 
 */
export const getAllRequestsForHr = async()=>{
    const response = await LeaveAPI.get("/requests/hr/get_all");
    return response.data;
}

/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getAllMyLeaves = async(email)=>{
    const response = await LeaveAPI.get("/employee-leaves/get_all", {
        params : {
            email : email
        }
    });
    return response.data;
}