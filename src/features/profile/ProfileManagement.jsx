import { useState } from "react"
import { PersonalDetails } from "./components/PersonalDetails";
import { SecurityDetails } from "./components/SecurityDetails";
import { BalanceDetails } from "./components/BalanceDetails";
import "./styles/ProfileManagement.css";

const components = [
        {id : 1, name : "Information Personelle", view: <PersonalDetails/>},
        {id : 2, name : "Securité", view : <SecurityDetails/>},
        {id : 3, name: "Solde de congé", view : <BalanceDetails/>}
]
export const ProfileManagement = ()=>{

    const [selectedComponent, setSelectedComponent] = useState(1);
    return(
        <div className="container">
            <div className="left-section">
                {components.map((c)=>(
                    <div className="component-card">{c.name}</div>
                ))}
            </div>
            <div className="right-section">

            </div>
        </div>
    )
}