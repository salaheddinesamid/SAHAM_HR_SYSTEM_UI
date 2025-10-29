import BasicPie from "./charts/PieChart"

export const Overview = ()=>{
    return(
        <div className="row">
            <div className="row">
                <div className="col">
                    <BasicPie/>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}