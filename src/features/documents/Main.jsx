import { useState } from "react";
import { requestDocument } from "../../services/DocumentService";
import { Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { CheckIcon, TriangleAlert } from "lucide-react";
import { DocumentRequestHistory } from "./components/DocumentRequestHistory";
import { EmployeeDocumentRequestHistory } from "./components/EmployeeDocumentRequests";

export const DocumentRequest = ()=>{
    const user = JSON.parse(localStorage.getItem("userDetails"));
    const [selectedService, setSelectedService] = useState(1);
    const [requestLoading, setRequestLoading] = useState(false);
    const [submitSuccess,setSubmitSuccess] = useState(false);
    const [error,setError] = useState("");

    const documentTypes = [
        {id: 1, name: "Attestation de travail"},
        {id: 2, name: "Attestation de salaire"},
        {id: 3, name: "Attestation de domiciliation de salaire "},
        {id: 4, name: "Les trois derniers bulletins de paie"},
        {id: 5, name: "", component: <input type="text" placeholder="Autre"/>}
    ]

    /**
     * 
     * @param {*} param0 
     * @returns 
     */
    const RequestForm = ({user})=>{
        const [requestDto,setRequestDto] = useState({
            documents : [],
            entity : ""
        })
        /**
         * 
         * @param {*} document 
         */
        const handleDocumentToggle = (document)=>{
            setRequestDto((prev)=>{
                const isSelected = prev.documents.includes(document);

                return{
                    ...prev,
                    documents : isSelected ? prev.documents.filter((doc)=> doc !== document) : 
                    [...prev.documents, document]
                }
            })
        }

        const handleSubmit = async()=>{
            const email = user?.email;
            try{
                setRequestLoading(true);
                console.log(requestDto);
                const res = await requestDocument(email,requestDto);
                setSubmitSuccess(true);
            }catch(err){
                console.error(err);
                setError(err.message);
            }finally{
                setRequestLoading(false);
            }
            console.log(requestDto);
            
        }
        return (
        <Box sx={{ maxWidth: 650, mx: "auto", mt: 3 }}>
            <Snackbar
            open={submitSuccess}
            autoHideDuration={4000}
            onClose={() => setSubmitSuccess(false)}>
                <Alert severity="success">
                    Votre demande a été enregistrée avec succès
                </Alert>
            </Snackbar>
            
            <Snackbar
            open={error !== ""}
            autoHideDuration={4000}
            onClose={() => setError("")}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={1}>
                    Demande de documents RH
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Sélectionnez les documents que vous souhaitez recevoir.
                </Typography>
                
                <Stack spacing={1.5}>
                    {documentTypes.map((type) => {
                        const selected = requestDto.documents.includes(type.name);
                        return (
                        <Box
                        key={type.id}
                        sx={{
                            border: "1px solid",
                            borderColor: selected ? "primary.main" : "divider",
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            bgcolor: selected ? "action.selected" : "transparent"
                        }}>
                            <FormControlLabel
                            control={
                            <Checkbox
                            checked={selected}
                            onChange={() => handleDocumentToggle(type.name)}/>}
                            label={
                            <Stack>
                                <Typography fontWeight={500}>
                                    {type.name || "Autre"}
                                </Typography>
                                {selected && type.component}
                            </Stack>}/>
                        </Box>
                        );
                    })}
                </Stack>
                <Divider sx={{ my: 3 }} />
                <Box display="flex" justifyContent="flex-end">
                    <button
                    className="submit-btn"
                    variant="contained"
                    size="large"
                    disabled={
                        requestDto.documents.length === 0 || requestLoading
                    }
                    onClick={handleSubmit}>
                        {requestLoading
                        ? <CircularProgress size={22} />
                        : "Soumettre la demande"}
                    </button>
                </Box>
            </Paper>
        </Box>
    );
}

    const services = [
        {id: 1, name: "Nouvelle Demande", view: <RequestForm user={user}/>},
        {id: 2, name: "Statut des demandes", view:<DocumentRequestHistory user={user}/>},
        {id: 3, name: "Les demandes des collaborateurs", view:<EmployeeDocumentRequestHistory/>},
    ]
    return(
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "10px", margin: "0px 0px" }}>
                {services.map((service) => (
                  <p
                    key={service.id}
                    style={{
                      cursor: "pointer",
                      borderBottom: service.id === selectedService ? "2px solid #004170" : "",
                    }}
                    onClick={() => setSelectedService(service.id)}
                  >
                    {service.name}
                  </p>
                ))}
              </div>
              <div className="row">
                {services.map((s) => (s.id === selectedService ? s.view : ""))}
              </div>
        </div>
    )
}