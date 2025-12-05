import { useEffect, useState } from "react";
import "./styles/UserInformationCard.css";
import { getEmployee } from "../../services/EmployeeService";

export const UserInformationCard = ({exception,email}) => {
  const [user,setUser] = useState(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const fetchUser = async()=>{
    try{
        setLoading(true);
        const res = await getEmployee(email);
        console.log(res)
        setUser(res);
    }catch(err){
        console.log(err);
        setError(err.message)
    }finally{
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
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
                <p>Entité : {user?.entity}</p>
            </div>
            <div className="col">
                <p>Responsable : {user?.managerName || "MME"}</p>
            </div>
        </div>
        <div className="row">
        </div>
        {
            exception !== "Without solde" ? 
            <div className="row mt-3">
                <div className="col">
                    <p>Solde {user?.balanceDetails?.year} : <b>{user?.balanceDetails?.currentBalance} Jour (s)</b></p>
                </div>
                
                <div className="col">
                    <p>Droit annuel : <b>{user?.balanceDetails?.annualBalance} Jours</b></p>
                </div>
                
                <div className="col">
                    <p>Jours Cumulés : <b>{user?.balanceDetails?.accumulatedBalance} Jour (s)</b></p>
                </div>
                
                <div className="col">
                    <p>Pris : <b>{user?.balanceDetails?.usedBalance} Jour (s)</b></p>
                </div>
                <div className="col">
                    <p>Reliquat : <b>{user?.balanceDetails?.reminderBalance} Jour (s)</b></p>
                </div>
            </div> : <></>
        }
      </div>
      <div className="row">
        <p><b>NB:</b> - Vous pouvez annuler votre demande de congé tant qu’elle est toujours en attente chez le manager.<p style={{
          fontSize : "12px"
        }}> </p></p>
        
        <p style={{
          fontSize : "12px",
          marginLeft : "26px",
          marginTop : "-10px"
        }}>- Une fois votre demande de congé validée, toute demande d’annulation doit être adressée à l’équipe RH.</p>
      </div>
    </div>
  );
};
