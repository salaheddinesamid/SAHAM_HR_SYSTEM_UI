import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const DocumentRequestApprovalDialog = ({ open, onClose, request }) => {

    const [documents, setDocuments] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});

    useEffect(() => {
        if (request?.documents) {
            const docs = request.documents.split(",");   // <-- FIXED
            setDocuments(docs);
        }
    }, [request]);

    const handleFileChange = (docName, file) => {
        setUploadedFiles(prev => ({
            ...prev,
            [docName]: file
        }));
    };

    const handleUploadDocument = async () => {
        try {
            const formData = new FormData();

            Object.entries(uploadedFiles).forEach(([docName, file]) => {
                formData.append(docName, file);
            });

            // API CALL EXAMPLE:
            // await axios.post(`/api/document-requests/${request.id}/upload`, formData);

        } catch (err) {
            console.error(err);
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Validation de la demande</DialogTitle>

            <DialogContent>
                <p>Veuillez uploader les documents :</p>

                {documents.map((doc, i) => (
                    <div className="row my-2" key={i}>
                        <div className="col-6 d-flex align-items-center">
                            <b>{doc}</b>
                        </div>
                        <div className="col-6">
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(doc, e.target.files[0])}
                            />
                        </div>
                    </div>
                ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="error">Annuler</Button>
                <Button onClick={handleUploadDocument} variant="contained">Valider</Button>
            </DialogActions>
        </Dialog>
    );
};
