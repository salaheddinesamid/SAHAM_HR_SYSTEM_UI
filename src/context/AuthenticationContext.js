import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthenticationContextProvider = ({children})=>{
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    // handle user login
    const login = ()=>{}

    // handle user log out
    const logOut = ()=>{
        try{
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        }catch(err){

        }
    }
    return (
        <AuthContext.Provider>

        </AuthContext.Provider>
    )
}

