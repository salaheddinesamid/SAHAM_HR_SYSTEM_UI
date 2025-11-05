import { AuthAPI } from "../apis/AuthenticationAPI"

export const authenticate = async(loginDetails)=>{
    return await AuthAPI.post("",loginDetails);
    //return response;
}


export const logOut = async()=>{
    const reponse = await AuthAPI.post("logout");
    return reponse.status;
}