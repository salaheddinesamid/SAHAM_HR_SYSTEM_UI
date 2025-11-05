import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const ProtectedRoute = ({children})=>{

    const userDetails = localStorage.getItem("userDetails");
    const accessToken = Cookies.get("accessToken");

    const navigate = useNavigate();

    useEffect(()=>{
        if(!userDetails && !accessToken){
            navigate('/',{
                state : {
                    message : "",
                    from : window.location.pathname
                }
            })
        }
    },[userDetails,accessToken,navigate]);

    return userDetails ? children : null;
}