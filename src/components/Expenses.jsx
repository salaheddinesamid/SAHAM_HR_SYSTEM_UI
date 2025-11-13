import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { ExpenseFormDialog } from "./dialogs/NewExpenseDialog";
import { getAllExpenses } from "../services/ExpenseService";


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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date de creation</TableCell>
                            <TableCell>Motif</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            expenses.map((e)=>(
                                <TableRow>
                                    <TableCell>{e?.createdAt}</TableCell>
                                    <TableCell>{e?.motif}</TableCell>
                                    <TableCell>{e?.createdAt}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            )}
            <ExpenseFormDialog open={newExpenseDialogOpen} onClose={handleCloseNewExpenseDialog}/>
        </div>
    )
}