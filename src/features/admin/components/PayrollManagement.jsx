import { CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react"
import { mapPayrollStatus } from "../utils/PayrollUtils";
import { NewPayrollDialog } from "../dialogs/NewPayrollDialog";

export const PayrollManagement = ()=>{
    const [payrollsHistory, setPayrollsHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployeePayrollHistory = async ()=>{
        try{

        }catch (err){

        }finally{
            setLoading(false);
        }
    }
    return(
        <Paper sx={{p:2}}>
            <Typography>
                Historique d'execution des bulettins de paie
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID de l'execution</TableCell>
                        <TableCell>Mois</TableCell>
                        <TableCell>Année</TableCell>
                        <TableCell>Date de l'execution</TableCell>
                        <TableCell>Nombre de pages traités</TableCell>
                        <TableCell>Nombre d'operations réussi</TableCell>
                        <TableCell>Nombre d'operations échoué</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                {loading && payrollsHistory.length === 0 && (
                    <CircularProgress/>
                )}
                {!loading && payrollsHistory.length !== 0 && (
                    <TableBody>
                        {payrollsHistory.map((history) =>(
                            <TableRow>
                                <TableCell>{history?.payrollHistoryId}</TableCell>
                                <TableCell>{history?.payrollMonth}</TableCell>
                                <TableCell>{history?.payrollYear}</TableCell>
                                <TableCell>{history?.executionDate}</TableCell>
                                <TableCell>{}</TableCell>
                                <TableCell>{}</TableCell>
                                <TableCell>{}</TableCell>
                                <TableCell>{(()=>{
                                    const {label, bgColor} = mapPayrollStatus(history?.status)
                                    return <span className={`badge ${bgColor}`}>{label}</span>
                                })}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
                
            </Table>
            <NewPayrollDialog/>
        </Paper>
    )
}