import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from '../types/DashboardTypes'; // Importar el tipo

// Definición de Props para TableUI
interface TableUIProps {
    data: OpenMeteoResponse | undefined;
    loading: boolean;
    error: string | null;
}

// Modificar combineArrays para manejar las etiquetas de tiempo (string[]) y los valores numéricos
function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    // Limitar al tamaño de arrLabels, aunque los 3 arrays deberían tener la misma longitud
    return arrLabels.map((label, index) => ({
        id: index,
        // Formatear el label (que es el tiempo ISO) para que sea más legible, tomando solo la hora y minuto
        label: new Date(label).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
        value1: arrValues1[index],
        value2: arrValues2[index]
    }));
}

// Actualizar columnas para reflejar las nuevas etiquetas
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'label',
        headerName: 'Hora', // Cambiado a 'Hora'
        width: 125,
    },
    {
        field: 'value1',
        headerName: 'Temp. (°C)', // Cambiado a 'Temp. (°C)'
        width: 125,
    },
    {
        field: 'value2',
        headerName: 'Viento (km/h)', // Cambiado a 'Viento (km/h)'
        width: 150,
    },
    {
        field: 'resumen',
        headerName: 'Resumen',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
    },
];

// Datos de ejemplo eliminados, ahora se usarán los props.

export default function TableUI({ data, loading, error }: TableUIProps) {

    let rows: any = [];

    if (data) {
        // Usar los datos de la API: tiempo, temperatura y viento
        const arrLabels = data.hourly.time;
        const arrValues1 = data.hourly.temperature_2m;
        const arrValues2 = data.hourly.wind_speed_10m;
        rows = combineArrays(arrLabels, arrValues1, arrValues2);
    }

    if (loading) {
        return <Typography variant="h6">Cargando datos de la tabla...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error al cargar la tabla: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="h6">Esperando datos...</Typography>;
    }


    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}