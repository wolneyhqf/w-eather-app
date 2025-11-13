export interface CityWeather {
    datetime: string;
    cityName: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    dewPoint: number;
    hourly: {
        datetime: string;
        temperature: number;
    }[];
}

export interface CityWeatherResponse {
    current: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust: number;
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
    };
    hourly: {
        dt: number;
        temp: number;
    }[];
}

export interface GeolocationResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}