import api from "./api"

export async function getCityWeather({lat, lon}: {lat: number, lon: number}){
    const response = await api.get('/data/3.0/onecall', {
      params: {
        lat,
        lon,
        exclude: 'alerts,minutely',
        appid: process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY,
        units: 'metric',
      },
    })
    
    return response.data
  }