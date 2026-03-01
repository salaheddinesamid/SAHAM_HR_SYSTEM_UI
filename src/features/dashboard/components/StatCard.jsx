import { Box, Typography } from "@mui/material";

export const StatCard = ({ icon, label, value, bgColor}) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    p={3}
    borderRadius={3}
    bgcolor={bgColor}
    boxShadow="0 3px 12px rgba(0,0,0,0.08)"
  >

    <Box sx={{
      display : "flex",
      justifyContent : "space-between",
      alignItems : "center"
    }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography className="ms-3" variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  </Box>
);