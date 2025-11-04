import { AuthAPI } from "../apis/AuthenticationAPI"

export const authenticate = async(loginDetails)=>{
    return await AuthAPI.post("",loginDetails);
    //return response;
}