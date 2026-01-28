/**
 * 
 */
import { useState } from "react"
import { PreInternRequestForm } from "./PreInternForm";
import { AdvanceForm } from "./AdvanceForm";

const types = [
    {id: 1, name: "Prêt Interne", view: <PreInternRequestForm/>},
    {id: 2, name: "Avance", view: <AdvanceForm/>}
]
export const LoanRequest = () =>{
    const [selectedType, setSelectedType] = useState(1);
        return(
            <div className="row mt-4">
                <div className="row">
                    {
                    types.map((type)=>(
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
                <div className="row mt-3">
                    {types.map((t) => (t.id === selectedType ? t.view : ""))}
                </div>
            </div>
        )
}