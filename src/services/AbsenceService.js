import { AbsenceAPI } from "../apis/AbsenceAPI"
/**
 * Apply new absence request
 * @param {*} email 
 * @param {*} requestDto 
 * @param {*} token
 * @returns status response
 */
export const applyAbsence = async (email, requestDto) => {
    const response = await AbsenceAPI.post("new", requestDto, {
        params : {
            email : email
        },
        withCredentials: true // if using cookies/JWT
    });
    return response.status;
};
/**
 * Get all absence requests for an employee.
 * @param {*} email 
 * @param {*} page 
 * @param {*} size 
 * @returns list of all absence requests
 */
export const getMyAbsenceRequests = async (email, page, size)=>{
    const response = await AbsenceAPI.get("employee-absences/get_all", {
        params : {
            email : email,
            pageNumber : page,
            pageSize : size
        }
    });
    return response.data;
}

/**
 * Get all the absence requests that needs approval/rejection by the manager.
 * @param {*} email 
 * @returns list of all subordinates absence requests
 */
export const getAllSubordinatesAbsenceRequests = async(email, pageNumber, pageSize)=>{
    const response = await AbsenceAPI.get("/requests/subordinates/get_all",{
        params : {
            email : email,
            pageNumber: pageNumber,
            pageSize : pageSize
        }
    });
    return response.data;
}

/**
 * @param {*} token
 * @returns 
 */
export const getAllAbsenceRequestsForHR = async(pageNumber, pageSize)=>{
    const response = await AbsenceAPI.get("/requests/hr/get_all",{
        params : {
            pageNumber : pageNumber,
            pageSize : pageSize
        }
    });
    return response.data;
}

/**
 * @param {*} token
 * @param {*} email 
 * @param {*} refNumber 
 * @returns 
 */
export const approveSubordinate = async(email, refNumber)=>{
    const response = await AbsenceAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy  : email,
            refNumber : refNumber
        }
    });
    return response.status;
}
/**
 * 
 * @param {*} email 
 * @param {*} refNumber 
 */
export const rejectSubordinate = async(token, email, refNumber)=>{

};
/**
 * @param {*} token
 * @param {*} refNumber 
 */
export const rejectAbsence = async(token, refNumber)=>{

}

/**
 * 
 * @param {*} refNumber 
 * @returns 
 */
export const approveAbsence = async(refNumber)=>{
    const response = await AbsenceAPI.put("/requests/hr/approve",null,{
        params : {
            refNumber : refNumber
        }
    });
    return response.status;
}
/**
 * 
 * @param {*} path 
 * @returns 
 */
export const downloadAbsenceMedicaleCertificate = async(path)=>{
    const response  =  await AbsenceAPI.get("/medical-certificates/download",{
        params : {
            path : path
        }
    });
    return response.data;
}