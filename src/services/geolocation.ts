import { GeolocationResponse } from "../types";
import api from "./api"

async function getCoordinatesByLocationName(q: string, limit = 1): Promise<GeolocationResponse[]> {
  const response = await api.get("/geo/1.0/direct", {
        params: {
          q,
          limit,
          appid: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
        },
    });
  
    return response.data;
}

export { getCoordinatesByLocationName };
