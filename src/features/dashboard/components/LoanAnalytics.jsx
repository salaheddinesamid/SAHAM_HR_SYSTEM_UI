import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from '../dataset/weather';

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
      width: 60,
    },
  ],
  height: 300,
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ dataKey: 'month' }]}
      series={[
        { dataKey: 'london', label: 'London', valueFormatter },
        { dataKey: 'paris', label: 'Paris', valueFormatter },
        { dataKey: 'newYork', label: 'New York', valueFormatter },
        { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}


export const LoanAnalytics = ()=>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    // Filters:
    const [currentType, setCurrentType] = useState("ALL");
    const [currentEntity, setCurrentEntity] = useState("ALL");
    const [currentDepartment, setCurrentDepartment] = useState("ALL");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const fetchData = async()=>{
        try{

        }catch(err){
            console.log(err);
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            marginBottom : 4,
            borderRadius: 4,
            background: "linear-gradient(145deg,#ffffff,#f4f7fb)",
            boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          }}
        >
          <Box mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}>
            <Box>
               <Typography variant="h4" fontWeight={700} color="#004170">
                Analyse des congés
              </Typography>
              
              <Typography color="text.secondary">
                Statistiques d’utilisation et de gestion des congés
              </Typography>
            </Box>
            <Box sx={{
              display : "flex",
              justifyContent : "space-between"
            }}>
              <TextField type="date" value={from} onChange={(e)=> setFrom(e.target.value)} label="From" InputLabelProps={{shrink : true}}/>
              <TextField type="date" value={to} onChange={(e)=> setTo(e.target.value)} label="To" InputLabelProps={{shrink : true}}/>
              <select name="" id="" value={currentDepartment} onChange={(e)=> setCurrentDepartment(e.target.value)}>
                    <option value="">Filtrer par département</option>
                    {departments.map((e)=>(
                        <option value={e.value} key={e.id}>{e.label}</option>
                    ))}
                </select>
                <select name="" id="" value={currentEntity} onChange={(e)=> setCurrentEntity(e.target.value)}>
                    <option value="">Filtrer par entité</option>
                    {entities.map((e)=>(
                        <option value={e.value} key={e.id}>{e.label}</option>
                    ))}
              </select>
            </Box>
          </Box>
    
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "320px 1fr" }}
            gap={4}
            alignItems="center"
          >
            <DonutChart data={chartData}/>
    
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", sm: "repeat(2,1fr)" }}
              gap={3}
            >
              <StatCard label="Total congés demandés" value={data?.totalRequests || 0} />
              <StatCard label="Congés approuvés" bgColor={"#00e676"} value={data?.totalApprovedLeaves || 0} />
              <StatCard label="Congés rejetés" bgColor={"#e57373"} value={data?.totalRejectedLeaves || 0} />
              <StatCard label="Demandes en attente" bgColor={"#ffe0b2"} value={data?.totalPendingLeaveRequests || 0 } />
              <StatCard label="Solde moyen restant" value={`${data?.leaveDaysRate || 0} jours`} /> 
            </Box>
          </Box>
        </Paper>
    );
}