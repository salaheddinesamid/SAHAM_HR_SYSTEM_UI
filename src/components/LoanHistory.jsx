import { useEffect, useState } from "react"
import { getAllEmployeeRequests } from "../services/LoanService";
import { CircularProgress } from "@mui/material";

// This component returns and renders all employee's loan requests
export const LoanHistory = ({user})=>{
    const [loading,setLoading] = useState(false);
    const [requests,setRequests] = useState([]);

    const fetchRequests = async()=>{
        const email = user?.email;
        try{
            setLoading(true);
            const res = await getAllEmployeeRequests(email);
            setRequests(res);

        }catch(err){

        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[user])

    return(
        <div className="row">
            {loading && (
                <CircularProgress/>
            )}
            {!loading && requests.length !== 0 && (
                <p>Aucune demande de pret/avance trouvée.</p>
            )}
        </div>
    )
}