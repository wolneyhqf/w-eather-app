import { CityWeather, CityWeatherResponse } from "../types";

export function mapCityWeather(response: CityWeatherResponse, cityName: string): CityWeather {
    return {
        datetime: new Date(response.current.dt * 1000).toLocaleString(),
        cityName: cityName,
        temperature: response.current.temp,
        humidity: response.current.humidity,
        windSpeed: response.current.wind_speed,
        pressure: response.current.pressure,
        visibility: response.current.visibility / 1000,
        uvIndex: response.current.uvi,
        dewPoint: response.current.dew_point,
        hourly: response.hourly.map(hour => ({
            datetime: new Date(hour.dt * 1000).toISOString(),
            temperature: hour.temp,
        })),
    }
}