import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { payrollDateParser } from "../utils/PayrollUtils";
import { uploadPayroll } from "../../../services/PayrollService";
import { CloudUpload } from "lucide-react";
import LinearWithValueLabel from "../../../components/PercentageProgress";
import axios from "axios";

export const NewPayrollDialog = ({open, onClose, onSuccess})=>{
    //
    const [selectedMonth, setSelectedMonth] = useState(0);
    //
    const [selectedYear, setSelectedYear] = useState(0);
    const [payrollFile, setPayrollFile] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleDateChange = (e) =>{
        const date = e.target.value;
        const {year, month, day} = payrollDateParser(date);
        setSelectedMonth(month);
        setSelectedYear(year);
    }
    const handleSubmit = async() =>{
        try{
            setSubmissionLoading(true);
            setProgress(0);
            // construct key-value request body
            const formData = new FormData();
            formData.append("file", payrollFile);
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/v1/payrolls/upload`,
                formData,
                {
                    params: {
                        month: Number(selectedMonth),
                        year: Number(selectedYear),
                },
                onUploadProgress: (event) => {
                    if (!event.total) return;
                    const percent = Math.round((event.loaded * 80) / event.total);
                    setProgress(percent);
                },
            });
            setProgress(100);
        }catch (err){
            console.log(err);
        }finally{
            setSubmissionLoading(true);
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

        return (
            <div className="row mb-3">
                <div className="col-xl-12">
                    <Button style={{
                        marginBottom : 30
                    }}
                    component = "label"
                    variant="contained"
                    startIcon = {<CloudUpload/>}
                    fullWidth
                    >
                        Veuillez uploader la fiche des Bulletins de paie
                    </Button>
                </div>
            </div>
        )
    }
    return(
        <Dialog open={true} maxWidth="sm" fullWidth>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <Box display="grid" gap={2} mt={1}>
                    <Typography></Typography>
                    <TextField label="date" type="date" InputLabelProps={{shrink : true}} onChange={handleDateChange}/>
                    <DocumentUploader/>
                </Box>
                <Box>
                    <LinearWithValueLabel progress={progress}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button>Annuler</Button>
                <Button>Valider</Button>
            </DialogActions>
        </Dialog>
    )
}