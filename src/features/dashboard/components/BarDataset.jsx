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

export default function BarsDataset({data}) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'month' }]}
      series={[
        { dataKey: 'prêts', label: 'Prêts', valueFormatter },
        { dataKey: 'avances', label: 'Avances', valueFormatter }
      ]}
      {...chartSetting}
      colors={['#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0']}
    />
  );
}