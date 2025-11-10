import { LoanAPI } from "../apis/LoanAPI"

export const applyLoan = async(email,requestDto)=>{
    const response = await LoanAPI.post("/apply",requestDto,{
        params : {
            email : email
        }
    });
    return response.status;
}

export const getAllEmployeeRequests = async(email)=>{
    const response = await LoanAPI.get("/employee-requests",{
        params : {
            email : email
        }
    });

    return response.data;
}