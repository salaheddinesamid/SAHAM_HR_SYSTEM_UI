import { useState } from "react"
import Cookies from "js-cookie";
import { Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const AdminLoginPage = () =>{
    const navigate = useNavigate();
    const postAuthentication = ({token, userDetails})=>{
        // This function is responsible for handling success user authentication, 
        
        const accessToken = token?.accessToken;
        // store the token in JS Cookie:
        Cookies.set("accessToken", accessToken, { expires: 1, secure: true, sameSite: "Strict" })
        
        // store user details on localstorage:
        localStorage.setItem("userDetails",JSON.stringify(userDetails));
        const userRoles = userDetails?.roles;
        // redirection:
        if(userRoles.find((role)=> role === "ADMIN")){
            setTimeout(()=>navigate("/administration"),2000);
        }
    }
    /**
     * 
     * @returns 
     */
    const LoginForm = ()=>{
        const [loading, setLoading] = useState(false);
        const [loginError, setLoginError] = useState("");
        const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
        const [loginDto, setLoginDto] = useState({
            email : "",
            password : ""
        })
        /**
         * 
         * @param {*} e 
         */
        const handleChange = (e)=>{
            const {name, value} = e.target;
            setLoginDto((prev)=>(
                {...prev, [name] : value}
            ))
        }
        /**
         * 
         */
        const handleSubmit = async()=>{
            try{

            }catch(err){

            }
            finally{
                setLoading(false);
            }
        }
        
        return(
        <div className="login-form-overlay">
          <div className="login-container shadow">
            <h2 className="login-title">Connexion</h2>
            <p className="login-subtitle">Accédez à votre espace employé</p>
            {loginError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {loginError}
              </Alert>
            )}
    
            {loginSuccessMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {loginSuccessMessage}
              </Alert>
            )}
    
            {!loading ? (
                <div className="row">
                    <input
              type="email"
              placeholder="Adresse e-mail ou identifiant"
              name="email"
              value={loginDto.email}
              onChange={handleChange}
              className="form-control mt-3 mb-3"
              
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={loginDto.password}
              onChange={handleChange}
              className="form-control mt-3 mb-3"
              required
            />
    
            <button className="login-btn mt-4" onClick={handleSubmit} disabled={loading}>{loading ? "Connexion..." : "Se Connecter"}</button>
                </div>
            ) : <CircularProgress/>
        }
    
            <p className="login-footer mt-3">
              Mot de passe oublié ? <a href="#">Réinitialiser</a>
            </p>
          </div>
        </div>
        )
    }
    return (
        <div className="container">
            <LoginForm/>
        </div>
    )
}