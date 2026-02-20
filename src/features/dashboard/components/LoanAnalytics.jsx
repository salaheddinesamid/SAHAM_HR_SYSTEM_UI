import { useState } from "react"

export const LoanAnalytics = ()=>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    const fetchData = async()=>{
        try{

        }catch(err){
            console.log(err);
            setError(err);
        }finally{
            setLoading(false);
        }
    }
}