import { useState } from "react"
import { getSubordinates } from "../services/EmployeeService";
import { CircularProgress } from "@mui/material";
import { SubordinateDetails } from "./SubordinateDetails";

// This function renders information about manager's subordinates leaves
export const MyTeam = ({manager})=>{

    const [subordinates,setSubordinates] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchTeam = async()=>{
        const email = manager?.email;
        try{
            setLoading(true);
            const res = await getSubordinates(email);
            setSubordinates(res);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    const TeamDetails = ()=>{
        return(
            <div className="container">
                {subordinates && subordinates.map((s)=>(
                    <SubordinateDetails details={s}/>
                ))}
            </div>
        )
    }

    return(
        <div className="row">
            {loading && subordinates.length === 0 && (
                <CircularProgress/>
            )}
            {!loading && subordinates.length !== 0 && (
                <p className="text-center">No team members found</p>
            )}
            {}
        </div>
    )
}