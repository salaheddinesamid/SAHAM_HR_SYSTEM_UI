import { useState } from "react"
import { AbsenceRequestForm } from "./AbsenceRequestForm"
import { LeaveRequestForm } from "./LeaveRequestForm"

export const Request = ({user})=>{

    const [selectedType,setSelectedType] = useState(1);
    const requestTypes = [
        {id : 1, name : "Congé", view : <LeaveRequestForm user={user}/>},
        {id : 2, name : "Absence", view : <AbsenceRequestForm user={user}/>}
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