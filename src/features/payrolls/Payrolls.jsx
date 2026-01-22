import { useEffect, useState } from "react"
import { getPayrollsOverview } from "../../services/PayrollService";
import { generateYears } from "./utils/YearsGeneratror";
import { Button, CircularProgress } from "@mui/material";
import { mapToMonth } from "./utils/MonthMapper";
import { Download } from "@mui/icons-material";

export const EmployeePayrolls = () =>{
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(false);
    const [payrolls, setPayrolls] = useState([]);


    let years = generateYears(2010, 2026);
    
    const handleYearChange = (e) =>{
        const value = e.target.value;
        let year = parseInt(value);
        setSelectedYear(year);
    }

    const fetchPayrolls = async() =>{
        try{
            setLoading(true);
            const res = await getPayrollsOverview(selectedYear);
            setPayrolls(res?.details);
            console.log(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleDownload = async(URL)=>{
        try{

        }catch(err){

        }finally{
            
        }
    }
    

    useEffect(()=>{
        fetchPayrolls();
    }, [selectedYear])

    return(
        <div className="container">
            <div className="row">
                <select value={selectedYear} onChange={handleYearChange}>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                        ))}
                </select>
            </div>
            <div className="row mt-4">
                {loading && payrolls.length === 0 && (
                    <CircularProgress/>
                )}
                {!loading && payrolls.length === 0 && (
                    <p>No records found</p>
                )}
                {payrolls && payrolls.map((payroll)=>(
                    <div className="col">
                        <p><b>{mapToMonth(payroll?.month)}</b></p>
                        <Button startIcon={<Download/>}>
                          Télécharger
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}