import { AbsenceAPI } from "../apis/AbsenceAPI"
/**
 * 
 * @param {*} email 
 * @param {*} requestDto 
 * @param {*} token
 * @returns 
 */
export const applyAbsence = async(token, email, requestDto)=>{
    const response = await AbsenceAPI.post("new", requestDto, {
        headers : {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        },
        params : {
            email : email
        }
    });
    return response.status;
}
/**
 * 
 * @param {*} email 
 * @returns 
 */
export const getAllSubordinatesAbsenceRequests = async(token, email)=>{
    const response = await AbsenceAPI.get("/requests/subordinates/get_all",{
        params : {
            email : email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}

/**
 * @param {*} token
 * @returns 
 */
export const getAllAbsenceRequestsForHR = async(token)=>{
    const response = await AbsenceAPI.get("/requests/hr/get_all",{
        headers : {
            Authorization : `Bearer ${token}`
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
export const approveSubordinate = async(token, email, refNumber)=>{
    const response = await AbsenceAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy  : email,
            refNumber : refNumber
        },
        headers : {
            Authorization : `Bearer ${token}`
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
export const approveAbsence = async(token, refNumber)=>{
    const response = await AbsenceAPI.put("/requests/approve",null,{
        params : {
            refNumber : refNumber
        },
        headers : {
            Authorization : `Bearer ${token}`
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