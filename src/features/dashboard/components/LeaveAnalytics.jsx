import { Box, Paper, Typography } from "@mui/material";
import { StatCard } from "./StatCard";

import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Congés Annuel', value: 400, color: '#0088FE' },
  { label: 'Congés Exceptionnel', value: 300, color: '#00C49F' }
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart() {
  return (
    <PieChart
      series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
      {...settings}
    />
  );
}


export const LeaveAnalytics = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
      }}
    >
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} color="#004170">
          Analyse des congés
        </Typography>

        <Typography color="text.secondary">
          Statistiques d’utilisation et de gestion des congés
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <DonutChart />

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={3}
        >
          <StatCard label="Total congés demandés" value={600} />
          <StatCard label="Congés approuvés" value={520} />
          <StatCard label="Demandes en attente" value={34} />
          <StatCard label="Solde moyen restant" value={"12 jours"} />
        </Box>
      </Box>
    </Paper>
  );
};
