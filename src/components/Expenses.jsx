import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { ExpenseFormDialog } from "./dialogs/NewExpenseDialog";
import { getAllExpenses } from "../services/ExpenseService";
import { Download, DownloadCloudIcon } from "lucide-react";
import { FileDownload } from "@mui/icons-material";


export const Expenses = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails")); 
    const [expenses,setExpenses] = useState([]);
    const [loadingExpenses,setLoadingExpenses] = useState(false);
    const [newExpenseDialogOpen, setExpenseDialogOpen] = useState(false);

    const handleOpenNewExpenseDialog = ()=>{
        setExpenseDialogOpen(true);
    }
    const handleCloseNewExpenseDialog = ()=>{
        setExpenseDialogOpen(false);
    }

    const fetchAllExpenses = async()=>{
        const email = user?.email;
        try{
            setLoadingExpenses(true);
            const res = await getAllExpenses(email);
            setExpenses(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoadingExpenses(false);
        }
    };

    const handleDownloadPDF = (expenseDetails)=>{

    }

    useEffect(()=>{
        fetchAllExpenses();
    },[])
    
    return(
        <div className="row">
            <div className="row">
                <div className="col-xl-4">
                    <button className="btn btn-primary" onClick={handleOpenNewExpenseDialog}>Ajouter une fiche de depense</button>
                </div>
            </div>
            {expenses.length === 0 && loadingExpenses && (
                <CircularProgress/>
            )}

            {expenses.length === 0 && !loadingExpenses && (
                <p className="text-center">No expenses found</p>
            )}

            {expenses.length !== 0 && !loadingExpenses && (
                <Paper style={{
                    marginTop : 20
                }}>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Date de creation</b></TableCell>
                            <TableCell><b>Motif</b></TableCell>
                            <TableCell><b>Total (DH)</b></TableCell>
                            <TableCell><b>Telecharger PDF</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            expenses.map((e)=>(
                                <TableRow>
                                    <TableCell>{e?.createdAt}</TableCell>
                                    <TableCell>{e?.motif || "None"}</TableCell>
                                    <TableCell>{e?.totalAmount}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={()=>handleDownloadPDF(e)}>
                                            <FileDownload />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </Paper>
            )}
            <ExpenseFormDialog open={newExpenseDialogOpen} onClose={handleCloseNewExpenseDialog}/>
        </div>
    )
}