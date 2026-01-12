import { Paper, Typography, Box, Chip } from "@mui/material";

export const KpiCard = ({
  label,
  value,
  status = "Success",
  statusColor = "success",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        },
        minHeight: 110,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        {label}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1.5}
      >
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>

        <Chip
          label={status}
          color={statusColor}
          variant="outlined"
          size="small"
          style={{fontWeight:"bold"}}
        />
      </Box>
    </Paper>
  );
};
