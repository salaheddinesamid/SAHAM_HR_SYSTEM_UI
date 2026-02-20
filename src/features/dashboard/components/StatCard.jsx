import { Box, Typography } from "@mui/material";

export const StatCard = ({ icon, label, value, bgColor}) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    p={3}
    borderRadius={3}
    bgcolor="#f8fafc"
    boxShadow="0 3px 12px rgba(0,0,0,0.08)"
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={48}
      height={48}
      borderRadius={2}
      bgcolor={bgColor}
      color="white"
    >
      {icon}
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  </Box>
);