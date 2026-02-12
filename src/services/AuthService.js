import { AuthAPI } from "../apis/AuthenticationAPI"
/**
 * 
 * @param {*} loginDetails 
 * @returns 
 */
export const authenticate = async(loginDetails)=>{
    return await AuthAPI.post("",loginDetails);
    //return response;
}

/**
 * 
 * @returns 
 */
export const logOut = async()=>{
    const reponse = await AuthAPI.post("logout");
    return reponse.status;
}
/**
 * 
 * @returns 
 */
export const resetPassword = async(email, token, newPassword) =>{
    const res = await AuthAPI.post("reset-password", null, {
        email : email,
        token : token,
        newPassword : newPassword
    });
    return res.status;
}
/**
 * 
 * @returns 
 */
export const setupPassword = async(email, token, password) =>{
    const res = await AuthAPI.post("setup-password",null,{
        params : {
            email : email,
            token : token,
            newPassword : password
        }
    });
    return res.status;
}
/**
 * 
 * @param {*} email 
 * @returns 
 */
export const forgotPassword = async(email) =>{
    const res = await AuthAPI.post("forgot-password", null, {
        params : {
            email : email
        }
    });
    return res.status;
}