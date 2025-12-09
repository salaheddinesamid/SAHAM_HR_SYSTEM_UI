import { DocumentAPI } from "../apis/DocumentAPI"

/**
 * 
 * @param {*} email 
 * @param {*} request 
 * @returns 200 OK if the request succeed.
 */
export const requestDocument = async(token, email, request)=>{
    const response = await DocumentAPI.post("request",request,{
        params : {
            email : email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.status;
}
/**
 * 
 * @param {*} email 
 * @returns a list of all document requests made by an employee
 */
export const getAllDocumentRequests = async(token, email)=>{
    const res = await DocumentAPI.get("/get_requests",{
        params : {
            email: email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return res.data;
}
/**
 * @param {*} token
 * @returns a list of all documents requests in process.
 */
export const getAllPendingRequests = async(token)=>{
    const response = await DocumentAPI.get("employees/get-all",{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}

/**
 * 
 * @param {*} id 
 * @returns 200 OK if the request succeed.
 */
export const approveDocumentRequest = async(token, id)=>{
    const response = await DocumentAPI.put("approve-request",null,{
        params : {
            requestId : id
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.status;
}

/**
 * 
 * @returns 
 */
export const rejectDocumentRequest = async()=>{
    const response = await DocumentAPI.put("reject-request");
    return response;
}
