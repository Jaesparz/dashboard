import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Definición de Props para ChartUI
interface ChartUIProps {
   data: OpenMeteoResponse | undefined;
   loading: boolean;
   error: string | null;
}

export default function ChartUI({ data, loading, error }: ChartUIProps) {

   // Definir colores para consistencia visual
   const TEMP_COLOR = '#FF7F50';
   const WIND_COLOR = '#4682B4';

   if (loading) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Cargando gráfico...</Typography>
         </Box>
      );
   }

   if (error) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color="error">Error al cargar el gráfico: {error}</Typography>
         </Box>
      );
   }

   if (!data) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Esperando datos para el gráfico...</Typography>
         </Box>
      );
   }

   const hourlyTimeSliced = data.hourly.time.slice(0, 24);
   const tempSliced = data.hourly.temperature_2m.slice(0, 24);
   const windSliced = data.hourly.wind_speed_10m.slice(0, 24);

   // 2. FORMATO: Formatear las etiquetas de tiempo (paso 2: texto corto HH:MM)
   const hourlyLabels = hourlyTimeSliced.map(timeStr =>
      // Usamos .split('T')[1] para obtener solo la hora, luego cortamos los segundos si existen, o simplemente usamos la hora formateada.
      // La implementación anterior con toLocaleTimeString era más limpia, pero usaremos el .split() para honrar la explicación.
      timeStr.split('T')[1].substring(0, 5) // Ej: "14:00"
   );

   const tempUnit = data.hourly_units.temperature_2m;
   const windUnit = data.hourly_units.wind_speed_10m;


   return (
      <Box sx={{ width: '100%' }}>
         <Typography variant="h5" component="div">
            Pronóstico Próximas 24 Horas: Temperatura y Viento
         </Typography>
         <LineChart
            height={300}
            series={[
               {
                  data: tempSliced, // Usar datos cortados
                  label: `Temperatura (${tempUnit})`,
                  yAxisId: 'temperatureAxis',
                  color: TEMP_COLOR,
                  showMark: false,
                  curve: 'catmullRom',
               },
               {
                  data: windSliced, // Usar datos cortados
                  label: `Viento (${windUnit})`,
                  yAxisId: 'windAxis',
                  color: WIND_COLOR,
                  showMark: false,
                  curve: 'catmullRom',
               },
            ]}
            xAxis={[{
               scaleType: 'point',
               data: hourlyLabels,
               label: 'Hora',
               // 3. GIMNASIA: Rotación y Anclaje de Etiquetas (tickLabelStyle)
               tickLabelStyle: {
                  angle: -45,
                  textAnchor: 'end',
                  fontSize: 10,
               }
            }]}
            yAxis={[
               {
                  id: 'temperatureAxis',
                  label: `Temperatura [${tempUnit}]`,
                  sx: {
                     '.MuiChartsAxis-tickLabel': { fill: TEMP_COLOR },
                     '.MuiChartsAxis-label': { fill: TEMP_COLOR },
                  },
               },
               {
                  id: 'windAxis',
                  label: `Viento [${windUnit}]`,
                  position: 'right',
                  sx: {
                     '.MuiChartsAxis-tickLabel': { fill: WIND_COLOR },
                     '.MuiChartsAxis-label': { fill: WIND_COLOR },
                  },
               },
            ]}
            // 4. ESPACIO INVISIBLE: Aumentar el margen inferior
            margin={{ top: 20, right: 80, bottom: 70, left: 60 }}
         />
      </Box>
   );
}