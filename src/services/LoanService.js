import { LoanAPI } from "../apis/LoanAPI"

export const applyLoan = async(email,requestDto)=>{
    const response = await LoanAPI.post("/apply",requestDto,{
        params : {
            email : email
        }
    });
    return response.status;
}