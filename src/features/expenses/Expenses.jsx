import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { getAllExpenses } from "../../services/ExpenseService";
import { FileDownload } from "@mui/icons-material";
import { ExpensePdfGenerator } from "../../services/ExpensesPdfGenerator";
import { ExpenseFormDialog } from "./dialogs/NewExpenseDialog";
import { expenseAmountMapper } from "./utils/ExpensesUtils";
import { LocalDateTimeMapper } from "../../utils/LocalDateTimeMapper";


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

    const handleDownloadPDF = async(expense)=>{
        const res = ExpensePdfGenerator(expense);
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
                            <TableCell><b>Total</b></TableCell>
                            <TableCell><b>Devise</b></TableCell>
                            <TableCell><b>Telecharger PDF</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            expenses.map((e)=>(
                                <TableRow>
                                    <TableCell>{LocalDateTimeMapper(e?.createdAt)}</TableCell>
                                    <TableCell>{e?.motif || "None"}</TableCell>
                                    <TableCell>{expenseAmountMapper(e?.totalAmount)}</TableCell>
                                    <TableCell>{e?.currency}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={()=>handleDownloadPDF(e)}>
                                            <FileDownload />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </Paper>
            )}
            <ExpenseFormDialog open={newExpenseDialogOpen} onClose={handleCloseNewExpenseDialog} user={user} onSuccess={fetchAllExpenses}/>
        </div>
    )
}