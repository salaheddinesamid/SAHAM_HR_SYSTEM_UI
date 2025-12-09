import { LoanAPI } from "../apis/LoanAPI"
/**
 * Request new loan.
 * @param {*} email 
 * @param {*} requestDto 
 * @param {*} token
 * @returns 
 */
export const applyLoan = async(email,requestDto)=>{
    const response = await LoanAPI.post("/apply",requestDto,{
        params : {
            email : email
        }
    });
    return response.status;
}
/**
 * Fetch all employee's loan requests.
 * @param {string} email 
 * @param {string} token
 * @returns 
 */
export const getAllEmployeeRequests = async(token, email)=>{
    const response = await LoanAPI.get("/employee/requests/get-all",{
        params : {
            email : email
        },
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response.data;
}
/**
 * 
 * @returns 
 */
export const getAllPendingRequests  = async()=>{
    const res = await LoanAPI.get("get-all-requests");
    return res.data;
}
/**
 * Approve employee's loan request.
 * @param {*} id 
 * @returns 
 */
export const approveLoan = async(id)=>{
    const res = await LoanAPI.put("/requests/hr/approve-request",null,{
        params : {
            requestId : id
        }
    });
    return res.status;
}
/**
 * Reject employee's loan request.
 * @param {*} id 
 * @returns 
 */
export const rejectLoan = async(id)=>{
    const res = await LoanAPI.put("/requests/hr/reject-request",null,{
        params : {
            requestId : id
        }
    })
    return res.status;
}