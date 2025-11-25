import { useState } from "react"
import { AbsenceRequestForm } from "./AbsenceRequestForm"
import { LeaveRequestForm } from "./LeaveRequestForm"

export const Request = ()=>{

    const [selectedType,setSelectedType] = useState(1);
    const requestTypes = [
        {id : 1, name : "Congé", view : <LeaveRequestForm/>},
        {id : 2, name : "Absence", view : <AbsenceRequestForm/>}
    ]
    return(
        <div className="row mt-2">
            <div className="row">
                {requestTypes.map((type)=>(
                    <div className="col">
                        <label htmlFor="" >
                            <input type="radio" value={selectedType} 
                            name="documentType" onChange={()=> setSelectedType(type.id)} checked={type.id === selectedType}/>
                            {type.name}
                        </label>
                    </div>
                ))
            }
            </div>
            <div className="row">
                {requestTypes.find((type)=> type.id === selectedType)?.view}
            </div>
        </div>
    )
}