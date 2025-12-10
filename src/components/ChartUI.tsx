import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

//const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const arrLabels = ['A','B','C','D','E','F','G'];

type ChartUIProps = {
   temperatures: number[] | undefined;
   velocidadViento: number[] | undefined;
   tiempo: string[] | undefined;
   temperatureUnits: string | undefined;
   velocidadVUnits: string | undefined;
}

export default function ChartUI({ temperatures, velocidadViento, tiempo, temperatureUnits, velocidadVUnits }: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Chart Tiempo vs Velocidad de viento & Temperatura
         </Typography>
         <LineChart
            height={300}
            //width={800}
            series={[
               { data: temperatures, label: `Temperatura ${temperatureUnits}` },
               { data: velocidadViento, label: `Viento ${velocidadVUnits}` },
            ]}
            xAxis={[{ scaleType: 'point', data: tiempo }]}
         />
      </>
      

   );
}