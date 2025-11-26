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