import { useEffect, useState } from "react";
import { getEmployee } from "../../services/EmployeeService";

export const UserInformationCard = () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const EmployeeBalance = ({balanceDetails})=>{
    return(
        <div className="row mt-3">
            <div className="row">
                <div className="col">
                    <p>Solde {balanceDetails?.year} : <b>{balanceDetails?.currentBalance} Jour (s)</b></p>
                </div>
                
                <div className="col">
                    <p>Droit annuel : <b>{balanceDetails?.annualBalance} Jours</b></p>
                </div>
                
                <div className="col">
                    <p>Jours Cumulés : <b>{balanceDetails?.accumulatedBalance} Jour (s)</b></p>
                </div>
                
                <div className="col">
                    <p>Pris : <b>{balanceDetails?.usedBalance} Jour (s)</b></p>
                </div>
                
                <div className="col">
                    <p>Reliquat : <b>{balanceDetails?.reminderBalance} Jour (s)</b></p>
                </div>
            </div>
            <div className="row">
                <p><b>NB:</b> - Vous pouvez annuler votre demande de congé tant qu’elle est toujours en attente chez le manager.<p style={{
                    fontSize : "12px"
                }}> </p></p>
                
                <p style={{fontSize : "12px",marginLeft : "26px",marginTop : "-10px"}}>- Une fois votre demande de congé validée, toute demande d’annulation doit être adressée à l’équipe RH.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="user-information-card card shadow p-3 rounded-3">
      <div className="card-body">
         <EmployeeBalance balanceDetails={userDetails?.balanceDetails}/>
      </div>
    </div>
  );
};
