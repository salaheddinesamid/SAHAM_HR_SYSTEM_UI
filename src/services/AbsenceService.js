import { AbsenceAPI } from "../apis/AbsenceAPI"

export const applyAbsence = async(email, requestDto)=>{
    const response = await AbsenceAPI.post("new", requestDto, {
        headers : {
            "Content-Type" : "multipart/form-data"
        },
        params : {
            email : email
        }
    });
    return response.status;
}

// get all subordinates absence requests:
export const getAllSubordinatesAbsenceRequests = async(email)=>{
    const response = await AbsenceAPI.get("/requests/subordinates/get_all",{
        params : {
            email : email
        }
    });
    return response.data;
}

// get all absence requests for HR:
export const getAllAbsenceRequestsForHR = async()=>{
    const response = await AbsenceAPI.get("/requests/hr/get_all");
    return response.data;
}

// Approve subordinate absence request:
export const approveSubordinate = async(email, refNumber)=>{
    const response = await AbsenceAPI.put("/requests/subordinates/approve-request",null,{
        params : {
            approvedBy  : email,
            refNumber : refNumber
        }
    });
    return response.status;
}

export const downloadAbsenceMedicaleCertificate = async(path)=>{
    const response  =  await AbsenceAPI.get("/medical-certificates/download",{
        params : {
            path : path
        }
    });

    return response.data;
}