import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { approveDocumentRequest } from "../../../services/DocumentService";
import { CheckIcon } from "lucide-react";

export const DocumentRequestApprovalDialog = ({ open, onClose, request, onSuccess }) => {

    const [documents, setDocuments] = useState([]);
    //const [uploadedFiles, setUploadedFiles] = useState({});
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    /*
    const handleFileChange = (docName, file) => {
        setUploadedFiles(prev => ({
            ...prev,
            [docName]: file
        }));
    };*/

    const handleConfirm = async()=>{
        const id = request?.id;
        try{
            setLoading(true);
            const res  = await approveDocumentRequest(id);
            onSuccess();
            setTimeout(()=>{
                onClose();
            },3000)
        }catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
           {loading && (
            <CircularProgress/>
           )}
            <DialogTitle>La demande a ete validee avec succee</DialogTitle>

            <DialogContent>
                <Snackbar
                    open={success}
                    autoHideDuration={4000}
                    onClose={() => setSuccess(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                    severity="success" 
                    icon={<CheckIcon fontSize="inherit" />}
                    sx={{ width: '100%' }}
                    >
                          Votre demande a été enregistrer avec success
                    </Alert>
                </Snackbar>
                Êtes-vous sûr de vouloir approuver la demande de{" "}
                <strong>{request?.requestedBy}</strong> fait le{" "}
                <strong>{request?.requestDate}</strong>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="error">Annuler</Button>
                <Button onClick={handleConfirm} variant="contained" color="success">Valider</Button>
            </DialogActions>
        </Dialog>
    );
};
