// src/components/CohereUI.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { CohereAssistant } from '../functions/CohereAssistant'; 

// Define los tipos de las props
interface CohereUIProps {
    weatherData: any; // Usar el tipo OpenMeteoResponse si lo tienes
    loading: boolean;
}

export const CohereUI: React.FC<CohereUIProps> = ({ weatherData, loading }) => {
    
    const [cohereSummary, setCohereSummary] = useState<string | null>(null);
    const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);

    // Inicializa el asistente una sola vez al montar el componente.
    const assistant = useMemo(() => {
        try {
            return new CohereAssistant();
        } catch (e: any) {
            setSummaryError(e.message); // Captura error si la clave API falta
            return null;
        }
    }, []); 

    // Llama al asistente cuando los datos del clima cambian.
    useEffect(() => {
        if (weatherData && !loading && assistant) {
            
            setSummaryLoading(true);
            setSummaryError(null);
            setCohereSummary(null);

            const fetchSummary = async () => {
                try {
                    const summary = await assistant.getWeatherSummary(weatherData);
                    setCohereSummary(summary);
                } catch (err: any) {
                    setSummaryError("Fallo al contactar al asistente. " + err.message);
                } finally {
                    setSummaryLoading(false);
                }
            };
            
            fetchSummary();
        }
        
        // Limpia el resumen si no hay datos o si está cargando
        if (!weatherData && !loading) {
            setCohereSummary(null);
        }
    }, [weatherData, loading, assistant]); 

    return (
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Análisis de Inteligencia Artificial
            </Typography>
            
            {summaryLoading && (
                <Typography color="textSecondary">Generando resumen de IA...</Typography>
            )}
            
            {summaryError && (
                <Typography color="error">⚠️ Error: {summaryError}</Typography>
            )}
            
            {cohereSummary && !summaryLoading && (
                <Typography variant="body1">{cohereSummary}</Typography>
            )}
            
            {!weatherData && !loading && !cohereSummary && (
                <Typography color="textSecondary">Seleccione una ciudad para activar el análisis.</Typography>
            )}
        </Paper>
    );
};