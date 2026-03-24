import { Box, Paper, Typography } from "@mui/material";
import { StatCard } from "./StatCard";
import BarsDataset from "./LoanAnalytics";

export const ExpenseAnalytics = () =>{
    return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        marginTop : 5,
        background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
      }}
    >
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} color="#004170">
          Analyse des dépenses
        </Typography>

        <Typography color="text.secondary">
          Indicateurs clés sur l’absentéisme des collaborateurs
        </Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <BarsDataset />

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={3}
        >
          <StatCard label="Nombre total d’absences" value={0} />
          <StatCard label="Taux d’absentéisme (%)" value={"3.4%"} />
          <StatCard label="Moyenne jours / employé" value={2.1} />
          <StatCard label="Département le plus impacté" value="IT" />
        </Box>
      </Box>
    </Paper>
  );
}