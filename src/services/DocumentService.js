import { DocumentAPI } from "../apis/DocumentAPI"

// POST NEW DOCUMENT REQUEST:
export const requestDocument = async(email, request)=>{
    const response = await DocumentAPI.post("request",request,{
        params : {
            email : email
        }
    })
}

// GET ALL DOCUMENT REQUESTED BY AN EMPLOYEE:
export const getAllDocumentRequests = async(email)=>{

    const res = await DocumentAPI.get("/get_requests",{
        params : {
            email: email
        }
    })
    return res.data;
}

export const getAllPendingRequests = async()=>{
    const response = await DocumentAPI.get("employees/get-all");
    return response.data;
}

export const approveDocumentRequest = async(id)=>{
    const response = await DocumentAPI.put("approve-request",null,{
        params : {
            requestId : id
        }
    })
    return response;
}

export const rejectDocumentRequest = async()=>{
    const response = await DocumentAPI.put("reject-request");
    return response;
}
