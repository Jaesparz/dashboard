//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from "./components/HeaderUI"
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';



export default function App() {
  //const [count, setCount] = useState(0)

  const { data, loading, error } = useFetchData();


  return (


    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid container justifyContent="right" alignItems="center"><AlertUI description="NO SE PREVEEN LLUVIAS"></AlertUI></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}

      <Grid container size={{ xs: 12, md: 9 }} >


        {/* TEMPERATURA ACTUAL */}

        <Grid size={{ xs: 12, md: 3 }}>
          <IndicatorUI title='Temperatura (2m)' description='XX°C' />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>

          {loading && (
            <IndicatorUI title="Cargando..." description="..." />
          )}
          {error && (
            <IndicatorUI title="Error" description={error} />
          )}
          {data && !loading && !error && (
            <IndicatorUI
              title="Temperatura (2m)"
              description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
            />

          )}
        </Grid>


        {/* TEMPERATURA APARENTE */}

        <Grid size={{ xs: 12, md: 3 }}>

          {loading && (
            <IndicatorUI title="Cargando..." description="..." />
          )}
          {error && (
            <IndicatorUI title="Error" description={error} />
          )}
          {data && !loading && !error && (
            <IndicatorUI
              title="Temperatura Aparente (°C)"
              description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
            />

          )}

        </Grid>
      </Grid>


      {/*  VELOCIDAD DEL VIENTO */}

      <Grid size={{ xs: 12, md: 3 }}>

        {loading && (
          <IndicatorUI title="Cargando..." description="..." />
        )}
        {error && (
          <IndicatorUI title="Error" description={error} />
        )}
        {data && !loading && !error && (
          <IndicatorUI
            title="Velocidad Del Viento (km/h)"
            description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
          />

        )}

      </Grid>


      {/* HUMEDAD RELATIVA */}

      <Grid size={{ xs: 12, md: 3 }}>

        {loading && (
          <IndicatorUI title="Cargando..." description="..." />
        )}
        {error && (
          <IndicatorUI title="Error" description={error} />
        )}
        {data && !loading && !error && (
          <IndicatorUI
            title="Humedad Relativa (%)"
            description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
          />

        )}

      </Grid>




      {/* Gráfico */}
      {data && !loading && !error && (
        <Grid sx={{ display: { xs: "none", md: "block" } }}>
          <ChartUI
            temperatures={data.hourly.temperature_2m.slice(0, 24)}
            velocidadViento={data.hourly.wind_speed_10m.slice(0, 24)}
            tiempo={data.hourly.time.slice(0, 24)}
            temperatureUnits={data.hourly_units.temperature_2m} // Nota: No necesitas .slice(0, 24) aquí si solo es una unidad
            velocidadVUnits={data.hourly_units.wind_speed_10m} // Nota: No necesitas .slice(0, 24) aquí
          />
        </Grid>
      )}

      {/* Tabla */}
      <Grid sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

    </Grid >





  );
}


