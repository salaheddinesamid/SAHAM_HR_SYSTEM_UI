import { BarChart } from "@mui/x-charts";


export function valueFormatter(value) {
  return `${value}DH`;
}


const chartSetting = {
  yAxis: [
    {
      label: 'Montant (DH)',
      width: 60,
    },
  ],
  height: 300,
};

export default function BarsDataset({data, dataKey}) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'month' }]} // define the xAxis placeholders
      series={[
        { dataKey: 'totalAmount', label: 'totalAmount', valueFormatter }
      ]}
      {...chartSetting}
      colors={['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0']}
    />
  );
}