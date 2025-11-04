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