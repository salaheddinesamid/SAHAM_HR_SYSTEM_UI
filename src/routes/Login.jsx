import React, { useState } from "react";
import back from "../0002.jpg";
import "../styles/Login.css";
import logo from "../logo.png";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/AuthService";
import Cookies from "js-cookie";
import { Alert, CircularProgress } from "@mui/material";

export const Login = () => {


  const [showForm, setShowForm] = useState(false);
  
  const [loading,setLoading] = useState(false);
  const [loginError,setLoginError] = useState("");
  const [loginSuccessMessage,setLoginSuccessMessage] = useState("");
  const navigate = useNavigate();

  const LoginForm = () => {
    const [loginDetails,setLoginDetails] = useState({
        email: "",
        password : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // This function is responsible for handling success user authentication, 
    // store the token in Cookie, and user details in localstorage
    const postAuthentication = (token, userDetails)=>{

        const accessToken = token?.accessToken;
        // store the token in JS Cookie:
        Cookies.set("accessToken", accessToken, { expires: 1, secure: true, sameSite: "Strict" })

        // store user details on localstorage:
        localStorage.setItem("userDetails",JSON.stringify(userDetails));

        // redirection:
        setTimeout(()=>navigate("/dashboard"),2000);
    }

    const handleLogin = async()=>{
    try{
        setLoading(true);
        // call the auth:
        const res = await authenticate(loginDetails);

        const bearerToken = res?.data?.bearerToken;
        const userDetails = res?.data?.userDetails;

        setLoginSuccessMessage("Redirection...")

        // post authentication:
        postAuthentication(bearerToken,userDetails);
        console.log(res)
    }catch(err){
        console.log(err);
        setLoginError(err?.message)
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
          type="text"
          placeholder="Adresse e-mail ou identifiant"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          className="form-control mt-3 mb-3"
          
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          className="form-control mt-3 mb-3"
          required
        />

        <button className="login-btn mt-4" onClick={handleLogin} disabled={loading}>{loading ? "Connexion..." : "Se Connecter"}</button>
            </div>
        ) : <CircularProgress/>
    }

        <p className="login-footer mt-3">
          Mot de passe oublié ? <a href="#">Réinitialiser</a>
        </p>
      </div>
    </div>
    )
  };

  return (
    <div
      className="login-full"
      style={{
        backgroundImage: `url(${back})`,
      }}
    >
      <div className="overlay">
        <div className="top-bar">
            <div></div>
            <div>
                <img src={logo} alt="logo" className="top-logo" style={{
                    marginLeft : "100px"
                }}/>
            </div>
          <button
            className="login-btn top-right-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <LoginIcon/>
          </button>
        </div>
        {/*<img src={logo} alt="logo" className="" />*/}
        <h1 className="welcome-text" style={{
            margin : "200px"
        }}>Bienvenue sur votre espace MY HR SAHAM</h1>
      </div>

      {showForm && <LoginForm />}
    </div>
  );
};
