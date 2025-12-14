import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'quito': { latitude: -0.2298, longitude: -78.525 },
    'manta': { latitude: -0.9494, longitude: -80.7314 },
    'cuenca': { latitude: -2.9005, longitude: -79.0045 }


};

// Tipo del prop: string | null
export default function useFetchData(selectedOption: string | null) {


   
    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

         // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;


        const fetchData = async () => {

            setLoading(true);
            setError(null);

            try {

                const response = await fetch(URL);


                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                const json: OpenMeteoResponse = await response.json();


                setData(json);

            } catch (error: any) {
                setError(error.message);
                console.error("Error fetching data:", error);

            }
            finally {
                setLoading(false);
            }
        }


        fetchData();




    }, [selectedOption]);

    return { data, loading, error };




}