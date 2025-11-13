import { useState } from "react"

export const HRGuide = ()=>{

    const [selectedComponent,setSelectedComponent] = useState(1)
    const components = [
        {id : 1, name : "Procédures internes", view: <></>},
        {id : 2, name : "Templates ", view: <></>}
    ]

    return(
        <div className="row">
            <div style={{ display: "flex", gap: "10px", margin: "0px 0px" }}>
                {components.map((c) => (
                    <p
                    key={c.id}
                    style={{
                        cursor: "pointer",
                        borderBottom: c.id === selectedComponent ? "2px solid #004170" : "",
                    }}
                    onClick={() => setSelectedComponent(c.id)}
                    >
                        {c.name}
                    </p>
                ))}
            </div>
        </div>
    )
}