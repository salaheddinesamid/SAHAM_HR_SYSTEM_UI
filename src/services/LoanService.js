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

export const getAllPendingRequests  = async()=>{
    const res = await LoanAPI.get("get-all-requests");
    return res.data;
}

export const approveLoan = async(id)=>{
    const res = await LoanAPI.put("approve-request",null,{
        params : {
            requestId : id
        }
    });
    return res.status;
}

export const rejectLoan = async(id)=>{
    const res = await LoanAPI.put("reject-request",null,{
        params : {
            requestId : id
        }
    })
    return res.status;
}