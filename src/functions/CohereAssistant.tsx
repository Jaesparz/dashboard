// src/CohereAssistant.ts

import { CohereClient } from 'cohere-ai';

// Usamos el prefijo de tu entorno para obtener la clave.
// Si usas Vite, cambia process.env.REACT_APP_... a import.meta.env.VITE_...
const COHERE_API_KEY: string | undefined = import.meta.env.VITE_COHERE_API_KEY; 

export class CohereAssistant {
    private cohere: CohereClient;
    private systemPrompt: string;
    
    constructor() {
        if (!COHERE_API_KEY) {
            throw new Error("Clave API de Cohere no encontrada. Revisa .env.");
        }
        
        this.cohere = new CohereClient({
            token: COHERE_API_KEY,
        });

        // Prompt de contexto simple para resumir los datos complejos
        this.systemPrompt = "Eres un asistente meteorológico experto. Recibirás un objeto con datos del clima, incluyendo unidades. Tu tarea es generar un resumen conciso en español, usando solo los valores más importantes (temperatura actual, aparente y viento).";
    }

    /**
     * Envía los datos completos del clima a Cohere para una interpretación.
     * @param weatherData El objeto con los datos y unidades del clima.
     * @returns Una promesa con el resumen de texto generado por Cohere.
     */
    public async getWeatherSummary(weatherData: any): Promise<string> {
        // Simple mecanismo para evitar llamadas a la API si la clave falla
        if (!COHERE_API_KEY) {
             return "[ERROR DE CONFIGURACIÓN] No se pudo generar el resumen porque la clave API no está cargada.";
        }
        
        try {
            const dataString = JSON.stringify(weatherData, null, 2);
            const promptMessage = `Genera un resumen conciso usando los siguientes datos: ${dataString}`;
            
            const response = await this.cohere.chat({
                model: "command-a-03-2025", 
                message: promptMessage, 
                preamble: this.systemPrompt, 
            });

            return response.text.trim();

        } catch (error: any) {
            console.error("Error al contactar a Cohere:", error);
            // Esto se mostrará en la interfaz si hay un error de red o de clave inválida
            return `[ERROR ASISTENTE]: Fallo de conexión o clave inválida: ${error.message}`;
        }
    }
}