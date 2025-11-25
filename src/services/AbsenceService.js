import { AbsenceAPI } from "../apis/AbsenceAPI"

export const applyAbsence = async(email, requestDto)=>{
    const response = await AbsenceAPI.post("new", requestDto, {
        params : {
            email : email
        }
    });
    return response;
}