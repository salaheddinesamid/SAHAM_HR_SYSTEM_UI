import { Alert, CircularProgress, Snackbar, TextField } from "@mui/material";
import { CheckIcon, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react"
import { applyLeave, getTotalLeaveDays } from "../../../services/LeaveService";
import { dateFormatter, totalLeaveDaysCalculator } from "../utils/LeaveUtils";

export const LeaveRequestForm = ({user})=>{
    const [requestDto, setRequestDto] = useState({
        startDate: "",
        endDate: "",
        type: "",
        typeDetails : "",
        comment: "",
    });
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [totalDays, setTotalDays] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [requestLoading, setRequestLoading] = useState(false);
    const [totalDaysLoading, setTotalDaysLoading] = useState(false);
    const [submitSuccess,setSubmitSuccess] = useState(false);
    const [error,setError] = useState("");

    const leaveTypes = [
        { id: 1, name: "Annuel", value : "ANNUAL"},
        { id: 2, name: "Exceptionnel", value : "EXCEPTIONAL" ,subTypes: [
          {id: 1, name: "Mariage du salarié "},
          {id: 2, name: "Mariage d’un enfant du salarié "},
          {id: 3, name: "Naissance "},
          {id: 4, name: "Circoncision de l’enfant "},
          {id: 5, name: "Déménagement "},
          {id: 6, name: "Opération chirurgicale grave du conjoint ou d’un enfant "},
          {id: 7, name: "Décès du conjoint, d’un descendant ou d’un ascendant du salarié"},
          {id: 8, name: "Décès d’un ascendant du conjoint, frère ou sœur du salarié ou de son conjoint"},
        ]}
    ];

    // cleam the request after success submission:
    const cleanRequest = ()=>{
        setRequestDto({
            startDate: "",
            endDate: "",
            type: "",
            typeDetails : "",
            comment: "",
        })
    };
    
    
    const handleSubmit = async () => {
        const email = user?.email;
        try {
            setRequestLoading(true);
            const formData = new FormData();
            const payload = {
              ...requestDto,
              totalDays,
            };
            
            formData.append("requestDto", new Blob([JSON.stringify(payload)], { type: "application/json" }));
    
            //formData.append("file",selectedFile);
            console.log(requestDto);
            await applyLeave(email, formData);
            // if success, display a snackbar:
            setSubmitSuccess(true);
            // init the request dto:
            setRequestDto({
              startDate: "",
              endDate: "",
              type: "",
              comment: "",
            })
            console.log("Submitting request:", payload);
            cleanRequest();
            //alert("Demande envoyée avec succès !");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setRequestLoading(false);
        }
    };

    const calculateTotalLeaveDays = async(from, to) =>{
        try{
            setTotalDaysLoading(true);
            const res = await getTotalLeaveDays(from, to);
            setTotalDays(res);
        }catch(err){
            console.log(err);
        }finally{
            setTotalDaysLoading(false);
        }
    }

    useEffect(() => {
        if (from && to) {
            const fromDate = new Date(from);
            const toDate = new Date(to);
            //calculateTotalLeaveDays(dateFormatter(fromDate), dateFormatter(toDate));
            setRequestDto((prev) => ({
                ...prev,
                startDate: dateFormatter(fromDate),
                endDate: dateFormatter(toDate),
            }));
        }
    }, [from, to]);

    // handle date change and fetch total leave days:
    useEffect(()=>{
        if(from && to){
            const startDate = dateFormatter(from);
            const endDate = dateFormatter(to);
            calculateTotalLeaveDays(startDate, endDate);
        }
    },[from, to]);

    return (
    <div style={{ padding: 20, position: "relative" }}>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={4000}
        onClose={() => setSubmitSuccess(false)}
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
      <Snackbar
        open={error !== ""}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          icon={<TriangleAlert fontSize="inherit"/>}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      {requestLoading && (
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
          }}
        >
          <CircularProgress size={60} color="primary" />
        </div>
      )}

      <div
        className="request-form"
        style={{
          opacity: requestLoading ? 0.5 : 1,
          pointerEvents: requestLoading ? "none" : "auto",
        }}
      >

        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
          label="Date de début"
          type="date"
          helperText="Ce champ est obligatoire"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={(e) => setFrom(e.target.value)}
          FormHelperTextProps={{
            sx: { color: 'red' } // make helper text red
          }}
          />
          <TextField
          label="Date de retour"
          type="date"
          helperText="Ce champ est obligatoire"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={(e) => setTo(e.target.value)}
          FormHelperTextProps={{
            sx: { color: 'red' } // make helper text red
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <div className="col d-flex align-items-center">
            <p>
              Nombre de jours : <b>{totalDaysLoading ? <CircularProgress/> : totalDays}</b>
            </p>
          </div>
        </div>
        <div style={{ margin: "15px 0" }}>
          <p style={{ marginBottom: 10, fontWeight: 500 }}>Sélectionnez le type de congé :</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {leaveTypes.map((leave) => (
              <label key={leave.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <input
                  type="radio"
                  name="type"
                  value={leave.value}
                  checked={selectedType === leave.name}
                  onChange={() => {
                    setSelectedType(leave.name);
                    setRequestDto((prev) => ({
                      ...prev,
                      type: leave.value,
                    }));
                  }}
                />
                {leave.name}
                {leave.subTypes && selectedType === leave.name && (
                  <div className="row ms-3">
                    <select
                      className="styled-select"
                      style={{ fontSize: "12px" }}
                      name="typeDetails"
                      value={requestDto?.typeDetails}
                      onChange={(e)=> setRequestDto((prev)=>(
                        {...prev, typeDetails : e.target.value}
                      ))}
                    >
                      <option value="">-- Sélectionnez un type de congé --</option>
                      {leave.subTypes.map((sub, i) => (
                        <option key={i} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </label>
              
            ))}
          </div>
        </div>
        <TextField
          name="comment"
          label="Commentaire (optionnel)"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          onChange={(e)=>setRequestDto((prev)=>(
            {...prev, commen : e.target.value}
          ))}
        />
        <button className="submit-btn" onClick={handleSubmit} disabled={requestLoading}>
          Soumettre
        </button>
      </div>
    </div>
  );
}