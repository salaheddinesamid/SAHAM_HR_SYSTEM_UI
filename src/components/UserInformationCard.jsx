import { useEffect, useState } from "react";
import "../styles/UserInformationCard.css";
import { getEmployee } from "../services/EmployeeService";

export const UserInformationCard = ({exception}) => {
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
            <div className="col">
                <p>Nom et Prénom : {user?.fullName}</p>
            </div>
            <div className="col">
                <p>Poste : </p>
            </div>
            <div className="col">
                <p>Matricule : </p>
            </div>
            
        </div>
        <div className="row">
            <div className="col">
                <p>Date d'entrée : </p>
            </div>
            <div className="col">
                <p>Entitée : {user?.createdAt}</p>
            </div>
            <div className="col">
                <p>Responsable : </p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p>Direction /Departement : </p>
            </div>
        </div>
        {
            exception !== "Without solde" ? 
            <div className="row mt-3">
            <div className="col">
                <p>Solde 2024 : <b>{user.balanceDetails?.initialBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Droit annuel : <b>{user.balanceDetails?.accumulatedBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Jours Cumulés : <b>{user.balanceDetails?.accumulatedBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Pris : <b>{user.balanceDetails.usedBalance} Jours</b></p>
            </div>
            <div className="col">
                <p>Reliquat : <b>{user.balanceDetails?.leftBalance} Jours</b></p>
            </div>
        </div> : <></>
        }
      </div>
    </div>
  );
};
