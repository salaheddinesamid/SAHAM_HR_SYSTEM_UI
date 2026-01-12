import { KpiCard } from "./KpiCard";
import { Box } from "@mui/material";
import DashedLineChart from "./LineChart";
import BiaxialBarChart from "./BarChart";
import PieChartWithPaddingAngle from "./PieChart";

export const Overview = () => {
  return (
    <div className="row">
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
            <KpiCard label="Employees" value="128" status="+17% compared to last month"/>
            <KpiCard label="Absences" value="14" status="-10% compared to last month" statusColor="error" />
            <KpiCard label="Leaves" value="23" status="Pending" statusColor="warning" />
            <KpiCard label="Departments" value="8" />
        </Box>
        <div className="row mt-3">
            <div className="col">
                <DashedLineChart/>
            </div>
            <div className="col">
                <BiaxialBarChart/>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
                <PieChartWithPaddingAngle/>
            </div>
            <div className="col">

            </div>
        </div>
    </div>
  );
};
