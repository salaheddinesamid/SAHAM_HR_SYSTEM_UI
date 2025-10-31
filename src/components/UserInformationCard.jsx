import { useEffect, useState } from "react";
import "../styles/UserInformationCard.css";
import { getEmployee } from "../services/EmployeeService";

export const UserInformationCard = () => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchEmployeeDetails = async()=>{
    try{
        setLoading(true);
        const response = await getEmployee("salaheddine.samid@saham.com");
        setUser(response);
        
    }catch(err){
        console.log(err);
    }finally{
        setLoading(false);
    }
  }

  useEffect(() => {

    fetchEmployeeDetails();
    /**
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data)); // parse JSON properly
    }
    console.log(JSON.parse(data))
    */
  }, []);

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="user-information-card card shadow p-3 rounded-3">
      <div className="card-body">
        <div className="row">
            <h3>Information Personnelle :</h3>
            <div className="col">
                <p>Nom: {user?.fullName}</p>
            </div>
            <div className="col">
                <p>Occupation:</p>
            </div>
            <div className="col">
                <p>E-mail Address: {user?.email}</p>
            </div>
        </div>
        <div className="row mt-3">
            <h3>Solde :</h3>
            <div className="col">
                <p>Nombre de jours initiale : <b>{user.balanceDetails?.initialBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Jours Cumules : <b>{user.balanceDetails?.accumulatedBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Utilisee : <b>{user.balanceDetails.usedBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Restants : <b>{user.balanceDetails?.leftBalance} Jours</b></p>
            </div>
        </div>
      </div>
    </div>
  );
};
