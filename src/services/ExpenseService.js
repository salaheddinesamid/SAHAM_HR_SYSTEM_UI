import { ExpenseAPI } from "../apis/ExpenseAPI"

/**
 * 
 * @param {*} email 
 * @param {*} request 
 * @returns 
 */
export const newExpense = async(email,request)=>{
    const response = await ExpenseAPI.post("new",request,{
        params : {
            email : email
        }
    })

    return response.status;
}

/**
 * 
 * @param {*} token 
 * @param {*} email 
 * @returns 
 */
export const getAllExpenses = async(email)=>{

    const response = await ExpenseAPI.get("get-all",{
        params : {
            email : email
        }
    })
    return response.data;
}