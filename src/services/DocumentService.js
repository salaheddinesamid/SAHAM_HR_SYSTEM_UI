import { DocumentAPI } from "../apis/DocumentAPI"

/**
 * 
 * @param {*} email 
 * @param {*} request 
 * @returns 200 OK if the request succeed.
 */
export const requestDocument = async(email, request)=>{
    const response = await DocumentAPI.post("request",request,{
        params : {
            email : email
        }
    })
    return response.status;
}
/**
 * 
 * @param {*} email 
 * @returns a list of all document requests made by an employee
 */
export const getAllDocumentRequests = async(email, pageNumber, pageSize)=>{
    const res = await DocumentAPI.get("/requests/employee/get_all",{
        params : {
            email: email,
            pageNumber : pageNumber,
            pageSize : pageSize
        }
    })
    return res.data;
}
/**
 * @param {*} token
 * @returns a list of all documents requests in process.
 */
export const getAllPendingRequests = async(pageNumber, pageSize)=>{
    const response = await DocumentAPI.get("/requests/hr/get_all", {
        params : {
            pageNumber : pageNumber,
            pageSize : pageSize
        }
    });
    return response.data;
}

/**
 * 
 * @param {*} id 
 * @returns 200 OK if the request succeed.
 */
export const approveDocumentRequest = async(id)=>{
    const response = await DocumentAPI.put("approve-request",null,{
        params : {
            requestId : id
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
