import { Box, Button, Dialog, DialogActions, DialogContent, styled, Typography } from "@mui/material"
import { CloudUpload } from "lucide-react";
import { useState } from "react"
import { uploadProfilePicture } from "../../../services/EmployeeService";



export const ProfilePictureUpdateDialog = ({open, onClose, onSuccess}) =>{

    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState("");
    
    const handleImageChange = (e) => {
        const img = e.target.files[0];
        if (!img) return;
        
        // Validate type
        if (!["image/jpeg", "image/png", "image/jpg"].includes(img.type)) {
            alert("Only JPG, JPEG, PNG allowed");
            return;
        }
        // Validate size
        if (img.size > 5 * 1024 * 1024) {
            alert("Max size is 5MB");
            return;
        }
        setSelectedImage(img);
        setPreview(URL.createObjectURL(img))
    };
    const handleUpdate = async ()=>{
        try{
            setLoading(true);
            const res = await uploadProfilePicture(selectedImage);
            if(res === 200){
                onClose();
                onSuccess();
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    
    const DocumentUploader = () => {
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
        <Box
        sx={{
            border: "2px dashed #1976d2",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            backgroundColor: "#f9fbff",
            transition: "0.3s",
            "&:hover": {
                backgroundColor: "#f0f6ff"
            }
        }}>
            <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{
                textTransform: "none",
                px: 3,
                py: 1.2,
                borderRadius: 2
            }}>Charger la photo
            <VisuallyHiddenInput
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            />
            </Button>
            
            <Typography variant="body2" color="text.secondary" mt={1}>
                JPG, JPEG, PNG uniquement • Taille max 5MB
            </Typography>
            
            {selectedImage && (
                <Box
                mt={2}
                p={1.5}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    backgroundColor: "#fff"
                }}>
                    <Typography variant="body2">
                        {selectedImage.name}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                        ✔ Fichier sélectionné
                    </Typography>
                </Box>
            )}
        </Box>
        );
    };
    
    const handleUpload = async() =>{
        try{

        }catch(err){

        }finally{

        }
    }

    return(
        <Dialog open={open} fullWidth>
            <DialogContent>
                <div className="row">
                    {selectedImage === null && (
                        <DocumentUploader/>
                    )}
                    {selectedImage && (
                        <Box textAlign="center">
                            <img
                            src={preview}
                            alt="preview"
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                                objectFit: "cover"
                            }}/>
                            <Typography mt={2}>{selectedImage.name}</Typography>
                        </Box>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleUpdate}>Confirmer</Button>
            </DialogActions>
        </Dialog>
    )
}