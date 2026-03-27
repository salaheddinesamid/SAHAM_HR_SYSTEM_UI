import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { StatCard } from "./StatCard";
import { useEffect, useState } from "react";
import { getExpenseAnalyticsOverview } from "../../../services/AnalyticsService";
import BarsDataset from "./BarDataset";
import { generateYears } from "../../payrolls/utils/YearsGeneratror";

export const ExpenseAnalytics = () =>{

    const years = generateYears(2010, new Date().getFullYear);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dataSet, setDataSet] = useState([]);
    const [overviewData, setOverviewData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async(year) =>{
        try{
            setLoading(true);
            const res = await getExpenseAnalyticsOverview(year)
            setDataSet(res);
            console.log(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(selectedYear);
    }, [])
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

      {loading && dataSet.length === 0 && (
        <CircularProgress/>
      )}

      {!loading && dataSet.length === 0 && (
        <p>Aucune donnée de dépense disponible</p>
      )}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
        gap={4}
        alignItems="center"
      >
        <BarsDataset data={dataSet}/>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
          gap={3}
        >
          <StatCard label="Dépenses totales" value="120,000 MAD" />
          <StatCard label="Croissance (%)" value="+8.2%" />
          <StatCard label="Catégorie principale" value="Salaries" />
          <StatCard label="Département le plus dépensier" value="IT" />
        </Box>
      </Box>
    </Paper>
  );
}