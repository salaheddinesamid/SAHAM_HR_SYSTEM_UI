import LeaveAPI from "../apis/LeaveAPI"

/**
 * Apply new leave request.
 * @param {*} token 
 * @param {*} email 
 * @param {*} requestDto 
 * @returns 200 OK if the request succeed.
 */
export const applyLeave = async(token, email, requestDto)=>{
    return await LeaveAPI.post("/apply",requestDto,{
        params : {
            email: email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
}

/**
 * Cancel leave by the HR.
 * @param {*} token 
 * @param {*} referenceNumber 
 * @returns 
 */
export const cancelLeave = async(token, referenceNumber)=>{
    return await LeaveAPI.delete("cancel", {
        params : {
            refNumber : referenceNumber
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}
/**
 * Cancel leave request by the manager.
 * @param {*} token 
 * @param {*} refNumber 
 * @returns 
 */
export const cancelLeaveRequest = async(token, refNumber)=>{
    return await LeaveAPI.put("cancel-request", null, {
        params : {
            refNumber : refNumber
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
}
/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getMyLeaveRequests = async(token, email)=>{
    const response = await LeaveAPI.get("/requests/get",{
        params : {
            email: email
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const getSubordinatesLeaveRequests = async(token, email)=>{
    const response = await LeaveAPI.get("/requests/subordinates/get_all", {
        params : {
            email : email
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const approveSubordinatesLeave = async(token, email, requestId)=>{
    const response = await LeaveAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy : email,
            leaveRequestId : requestId
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const rejectSubordinatesLeave = async(token, requestId, managerEmail)=>{
    const response = await LeaveAPI.put("/requests/subordinates/reject-request",null,{
        params : {
            rejectedBy : managerEmail,
            leaveRequestId : requestId
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const finalLeaveApproval = async(token, requestId)=>{
    const response = await LeaveAPI.put("/requests/approve-request",null,{
        params : {
            leaveRequestId : requestId
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const finalLeaveRejection = async(token, requestId)=>{
    const response = await LeaveAPI.put("/requests/reject-request",null,{
        params : {
            requestId : requestId
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.status;
}

/**
 * 
 * @param {*} token 
 * @returns 
 */
export const getAllRequestsForHr = async(token)=>{
    const response = await LeaveAPI.get("/requests/hr/get_all",{
        headers : {
            Authorization : `Bearer ${token}`
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
export const getAllMyLeaves = async(token, email)=>{
    const response = await LeaveAPI.get("/employee-leaves/get_all", {
        params : {
            email : email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}