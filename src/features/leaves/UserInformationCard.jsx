import { useEffect, useState } from "react";
import "./styles/UserInformationCard.css";

export const UserInformationCard = ({exception}) => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [loading,setLoading] = useState(false);

  useEffect(() => {
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
                <p>Poste : {user?.occupation}</p>
            </div>
            <div className="col">
                <p>Matricule : {user?.matriculation}</p>
            </div>
            
        </div>
        <div className="row">
            <div className="col">
                <p>Date d'entrée : {user?.joinDate} </p>
            </div>
            <div className="col">
                <p>Entité : </p>
            </div>
            <div className="col">
                <p>Responsable : {user?.managerName}</p>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p>Departement : </p>
            </div>
        </div>
        {
            exception !== "Without solde" ? 
            <div className="row mt-3">
            <div className="col">
                <p>Solde {user?.balanceDetails?.year -1} : <b>{user.balanceDetails?.daysLeft} Jour (s)</b></p>
            </div>
            <div className="col">
                <p>Droit annuel : <b>{user.balanceDetails?.initialBalance} Jour (s)</b></p>
            </div>
            <div className="col">
                <p>Jours Cumulés : <b>{user.balanceDetails?.accumulatedBalance} Jour (s)</b></p>
            </div>
            <div className="col">
                <p>Pris : <b>{user.balanceDetails?.usedBalance} Jour (s)</b></p>
            </div>
            <div className="col">
                <p>Reliquat : <b>{user.balanceDetails?.leftBalance} Jour (s)</b></p>
            </div>
        </div> : <></>
        }
      </div>
    </div>
  );
};
