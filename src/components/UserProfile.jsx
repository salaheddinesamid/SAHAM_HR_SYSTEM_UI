import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/AuthService';

export const UserProfile = () => {
    const navigate = useNavigate();

    const handleLogOut = async()=>{
        try{

            // log out from the server:
            //await logOut();
            // safe delete user details:
            localStorage.clear("userDetails");

            // safe delete the token:
            Cookies.remove("accessToken");

            // navigate to login:
            navigate("/");
        }
        catch(err){
            console.log(err);
        }finally{

        }
    }
    return (
      <div className="user-info">
        <div className="user-avatar">
          <Avatar />
        </div>
        <div className="user-details">
          <p className="user-name">Salaheddine Samid</p>
          <p className="user-company">SAHAM</p>
        </div>
        <div className="log-out">
            <button className='btn btn-danger' onClick={handleLogOut}><LogoutIcon/></button>
        </div>
      </div>
    );
  };