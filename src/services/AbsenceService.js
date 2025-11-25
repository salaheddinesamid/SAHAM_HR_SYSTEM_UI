import { AbsenceAPI } from "../apis/AbsenceAPI"

export const applyAbsence = async(email, requestDto, file)=>{
    const response = await AbsenceAPI.post();
    return response;
}