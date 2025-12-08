import { useEffect, useState, type SetStateAction } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() {


    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchData = async  () => {

             setLoading(true);

            try {

                const response = await fetch(URL);


                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                const json: OpenMeteoResponse = await response.json();


                setData(json);

            } catch (error) {
                setError((error as Error).message);
                console.error("Error fetching data:", error);

            }
            finally{
                setLoading(false);
            }
        }


        fetchData();




    }, []);

    return {data,loading,error};




}