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
    return response;
}

// get all subordinates absence requests:
export const getAllSubordinatesAbsenceRequests = async(email)=>{
    const response = await AbsenceAPI.get("/subordinates-absences/get_all",{
        params : {
            email : email
        }
    });
    return response.data;
}