import { CircularProgress, Table, TableCell, TableHead } from "@mui/material"
import { useEffect, useState } from "react";
import { getSubordinatesLeaves } from "../services/LeaveService";
import { Check, X } from "lucide-react";

export const SubordinatesLeaveRequestsHistory = ({manager})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [requests,setRequests] = useState([]);

    const handleApproveRequest = async(requestId)=>{
        try{

        }catch(err){

        }finally{

        }
    }

    const handleRejectRequest = async(requestId)=>{
        try{

        }catch{

        }
        finally{

        }
    }

    const actions = [
        {id: 1, name: "Approver", icon: <Check />, color: "success"},
        {id: 2, name: "Rejeter", icon: <X />, color:"danger"}
    ]

    const fetchRequests = async()=>{
        const email = manager?.email;
        try{
            setLoading(true);
            const res = await getSubordinatesLeaves(email);
            setRequests(res);
        }catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    const statusMapper = (status) => {
    switch (status) {
        case "APPROVED":
            return { message: "Approuvée", color: "bg-success" };
            
        case "REJECTED":
            return { message: "Rejetée", color: "bg-danger" };
            
        case "IN_PROCESS":
            return { message: "En attente", color: "bg-warning text-dark" };
            
        case "CANCELLED":
            return { message: "Annulée", color: "bg-secondary" };
        default:
            return { message: "Inconnue", color: "bg-light text-dark" };
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[])

    return(
        <div className="row">

            {loading && !error && (
                <CircularProgress/>
            )}
            {!loading && requests.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Demandé par</th>
                            <th>Type</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Nombre de jours</th>
                            <th>Status</th>
                            <th>Commentaire</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={req.id || index}>
                                <td>{req.requestedBy}</td>
                                <td>{req.type}</td>
                                <td>{req.startDate}</td>
                                <td>{req.endDate}</td>
                                <td>{req.totalDays}</td>
                                <td>
                                    {(() => {
                                        const { message, color } = statusMapper(req.status);
                                        return <span className={`badge ${color}`}>{message}</span>;
                                    })()}
                                </td>
                                <td>{req.comment || "-"}</td>
                                <td>{actions.map((action)=>(
                                    <button className={`btn bg-${action.color} ms-1`}>{action.icon}</button>
                                ))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}