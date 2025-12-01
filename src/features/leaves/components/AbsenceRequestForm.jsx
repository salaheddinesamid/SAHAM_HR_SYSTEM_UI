import { CloudUpload } from "@mui/icons-material";
import { Alert, Button, CircularProgress, Snackbar, styled, TextField } from "@mui/material";
import { CheckIcon, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react"
import { dateFormatter } from "../utils/LeaveUtils";
import { applyAbsence } from "../../../services/AbsenceService";

export const AbsenceRequestForm = ({user})=>{
    const [requestDto,setRequestDto] = useState({
        type : "",
        startDate : "",
        endDate : ""
    })
    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [medicalCertificate,setMedicalCertificate] = useState(null);
    const [totalDays,setTotalDays] = useState(0);
    
    const [selectedType,setSelectedType] = useState(null);
    const [loading,setLoading] = useState(false);
    const [submitSuccess,setSubmitSuccess] = useState(false);
    const [error,setError] = useState("");

    const absenceTypes = [
        {id : 1, name : "Télétravail", value : "REMOTE_WORK"},
        {id : 2, name : "Maladie", value : "SICKNESS"}
    ]

    // clean the request after success submission
    const cleanRequest = ()=>{
        setRequestDto({
            type : "",
            startDate : "",
            endDate : ""
        })
        setFromDate("");
        setToDate("");
        setTotalDays(0);
        setMedicalCertificate(null);
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRequestDto((prev)=>(
            {...prev, [name] : value}
        ));
        console.log(requestDto);
    }
    const handleFileChange = (e)=>{
      const file = e.target.files[0];
      setMedicalCertificate(file);
    }
    
    const handleSubmit = async()=>{
        const email = user?.email; // email
        try{
            setLoading(true);
            // object to consutruct key-value request body
            const requestData = new FormData();
            requestData.append("startDate", requestDto?.startDate);
            requestData.append("endDate", requestDto?.endDate);
            requestData.append("type", requestDto?.type);
            
            if (requestDto.type === "SICKNESS" && medicalCertificate) {
                requestData.append("medicalCertificate", medicalCertificate);
            }
            console.log(requestDto);
            const res = await applyAbsence(email, requestData);
            if(res === 200){
                setSubmitSuccess(true);
                cleanRequest();
            }
            
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const DocumentUploader = ()=>{
          const VisuallyHiddenInput = styled("input")({
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1
          });
    
          return(
            <div className="row mb-3">
                <div className="col-xl-4">
                    <Button
                    style={{
                        marginBottom  : 30
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    fullWidth>
                        Veuillez uploader le certificat medical
                        <VisuallyHiddenInput
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                    </Button>
                </div>
            </div>
          )
        }

    useEffect(() => {
        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const diffDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
            setTotalDays(diffDays > 0 ? diffDays : 0);
            setRequestDto((prev) => ({
                ...prev,
                startDate: dateFormatter(from),
                endDate: dateFormatter(to),
            }));
        }
    }, [fromDate, toDate]);

    return(
        <div style={{ padding: 20, position: "relative" }}>
            <Snackbar open={submitSuccess} autoHideDuration={4000} onClose={() => setSubmitSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert 
                severity="success" 
                icon={<CheckIcon fontSize="inherit" />}
                sx={{ width: '100%' }}
                >
                    Votre demande a été enregistrer avec success
                </Alert>
            </Snackbar>
            <Snackbar open={error !== ""} autoHideDuration={4000} onClose={() => setError("")} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert 
                severity="error" 
                icon={<TriangleAlert fontSize="inherit"/>}
                sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
            {loading && (
                    <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}>
                        <CircularProgress size={60} color="primary" />
                    </div>
                )}
                <div className="request-form" style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto",}}>
                    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                        <TextField label="Date de début" type="date" name="startDate" helperText="Ce champ est obligatoire" value={fromDate} fullWidth InputLabelProps={{ shrink: true }} variant="outlined" onChange={(e) => setFromDate(e.target.value)}
                        FormHelperTextProps={{
                            sx: { color: 'red' } // make helper text red 
                        }}
                        />
                        <TextField label="Date de fin" type="date" name = "endDate" helperText="Ce champ est obligatoire" value={toDate} fullWidth InputLabelProps={{ shrink: true }} variant="outlined" onChange={(e) => setToDate(e.target.value)}
                        FormHelperTextProps={{
                            sx: { color: 'red' } // make helper text red
                        }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
                        <div className="col d-flex align-items-center">
                            <p>Nombre de jours : <b>{totalDays}</b></p>
                        </div>
                    </div>
                    
                    <div style={{ margin: "15px 0" }}>
                        <p style={{ marginBottom: 10, fontWeight: 500 }}>Sélectionnez le type d'absence :</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {absenceTypes.map((absence) => (
                                <label key={absence.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                                    <input
                                    type="radio"
                                    name="type"
                                    value={absence.value}
                                    checked={selectedType === absence.name}
                                    onChange={()=>{
                                        setSelectedType(absence.name)
                                        setRequestDto((prev)=>(
                                            {...prev, type : absence.value}
                                        ));
                                    }}
                                    />
                                    {absence.name}
                                </label>
                            ))}
                    </div>
                </div>
                 {selectedType === "Maladie" && (
                    <DocumentUploader/>
                )}
                <TextField name="comment" label="Commentaire (optionnel)" multiline rows={3} fullWidth variant="outlined" onChange={handleChange}/>
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                    Soumettre
                </button>
            </div>
        </div>
    )
}