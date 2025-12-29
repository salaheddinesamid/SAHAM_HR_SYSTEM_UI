import { Button, CircularProgress, Dialog, DialogActions } from "@mui/material";
import { useState } from "react"

export const EmployeeModificationDialog = ({employee, open, onClose, employeeDetails})=>{

    const [requestDto, setRequestDto] = useState({
        firstName : "",
        lastName : "",
        matriculation : "",
        entity : "",
        occupation : "",
        joinDate : "",
        email : "",
        newPassword : ""
    })

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRequestDto((prev)=>(
            {...prev, [name] : value}
        ))
    }

    const handleSubmit = async()=>{
        try{

        }catch(err){

        }finally{
            setLoading(false);
        }
    }

    return(
        <Dialog open={open}>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button>
                    {loading ? <CircularProgress size={22}/> : "Modifier"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}