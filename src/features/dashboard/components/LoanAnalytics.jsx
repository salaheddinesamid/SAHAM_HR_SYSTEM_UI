import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { BarChart } from '@mui/x-charts/BarChart';
import { generateYears } from "../../payrolls/utils/YearsGeneratror";

export const dataset = [
  {
    prêts: 59,
    avances: 57,
    month: 'Jan',
  },
  {
    prêts: 50,
    avances: 52,
    month: 'Feb',
  },
  {
    prêts: 47,
    avances: 53,
    month: 'Mar',
  },
  {
    prêts: 54,
    avances: 56,
    month: 'Apr',
  },
  {
    prêts: 57,
    avances: 69,
    month: 'May',
  },
  {
    prêts: 60,
    avances: 63,
    month: 'June',
  },
  {
    prêts: 59,
    avances: 60,
    month: 'July',
  },
  {
    prêts: 65,
    avances: 60,
    month: 'Aug',
  },
  {
    prêts: 51,
    avances: 51,
    month: 'Sept',
  },
  {
    prêts: 60,
    avances: 65,
    month: 'Oct',
  },
  {
    prêts: 67,
    avances: 64,
    month: 'Nov',
  },
  {
    prêts: 61,
    avances: 70,
    month: 'Dec',
  },
];

export function valueFormatter(value) {
  return `${value}DH`;
}


const chartSetting = {
  yAxis: [
    {
      label: 'Montant (DH)',
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
        { dataKey: 'prêts', label: 'Prêts', valueFormatter },
        { dataKey: 'avances', label: 'Avances', valueFormatter }
      ]}
      {...chartSetting}
    />
  );
}

const departments = [
    { id : 1, label : "Département financier", value : "FINANCE_DEPARTMENT"},
    { id : 2, label : "Département juridique", value : "LEGAL_DEPARTMENT" },
    { id : 3, label : "Département informatique", value : "IT"},
    { id : 4, label : "Département ressources humaines", value : "HUMAN_RESOURCES_DEPARTMENT" },
    { id : 5, label : "Opérations", value : "OPERATIONS"},
    { id : 6, label : "Asset management", value : "ASSET_MANAGEMENT" },
    { id : 7, label : "Cabinet du DG", value : "CEO_OFFICE" },
    { id : 8, label : "Surveillance bancaire", value : "BANKING_SUPERVISION" },
]
const entities  = [
    { id : 1, label : "SAHAM Horizon", value : "SAHAM_HORIZON"},
    { id : 2, label : "SAHAM Finances", value : "SAHAM_FINANCES"},
    { id : 3, label : "SAHAM Foundation", value : "SAHAM_FOUNDATION"}
]
export const LoanAnalytics = ()=>{

    const years = generateYears(2010, new Date().getFullYear);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    // Filters:
    const [currentType, setCurrentType] = useState("ALL");
    const [currentEntity, setCurrentEntity] = useState("ALL");
    const [currentDepartment, setCurrentDepartment] = useState("ALL");
    const [selectedYear, setSelectedYear] = useState();
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
            marginTop : 5,
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
                Analyse des prêts et avances
              </Typography>
              
              <Typography color="text.secondary">
                Statistiques d’utilisation et de gestion des prêts et avances
              </Typography>
            </Box>
            <Box sx={{
              display : "flex",
              justifyContent : "space-between"
            }}>
              <select name="" id="" value={selectedYear} onChange={(e)=> setSelectedYear(e.target.value)}>
                    <option value="">Filtrer par département</option>
                    {departments.map((e)=>(
                        <option value={e.value} key={e.id}>{e.label}</option>
                    ))}
                </select>
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
    
          <Box>
            <Box>
                <BarsDataset/>
            </Box>
          </Box>
        </Paper>
    );
}