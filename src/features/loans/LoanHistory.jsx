import { useEffect, useState } from "react"
import { getAllEmployeeRequests } from "../../services/LoanService";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { loanAmountMapper, loanStatusMapper, loanTypeMapper } from "./utils/Mapper";
import { LocalDateTimeMapper } from "../../utils/LocalDateTimeMapper";

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
            console.log(err);
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
            {!loading && requests.length === 0 && (
                <p className="text-center mt-3">Aucune demande de Prêt/Avance trouvée.</p>
            )}

            {!loading && requests.length !== 0 && (
                <Table>
                    <TableHead>
                        <TableCell><b>Date de soumission</b></TableCell>
                        <TableCell><b>Type de demande</b></TableCell>
                        <TableCell><b>Montant (MAD)</b></TableCell>
                        <TableCell><b>Motif</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableHead>
                    <TableBody>
                        {requests.map((r)=>(
                            <TableRow>
                                <TableCell>{LocalDateTimeMapper(r?.issueDate)}</TableCell>
                                <TableCell>{loanTypeMapper(r?.type)}</TableCell>
                                <TableCell>{loanAmountMapper(r?.amount)}</TableCell>
                                <TableCell>{r?.motif }</TableCell>
                                <TableCell>{(() => {
                        const { message, color } = loanStatusMapper(r.status);
                        return <span className={`badge ${color}`}>{message}</span>;
                        })()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}