import { ExpenseAPI } from "../apis/ExpenseAPI"

// Create new expense
export const newExpense = async(email,request)=>{
    const response = await ExpenseAPI.post("new",request,{
        params : {
            email : email
        }
    })

    return response.status;
}

// Get all employee depenses by email
export const getAllExpenses = async(email)=>{

    const response = await ExpenseAPI.get("get-all",{
        params : {
            email : email
        }
    })

    return response.data;
}