import axios from "axios";

export default class WeatherService {
    static async getWeather(position: number[]) {
        const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${position[0]}&lon=${position[1]}&appid=14bd6e54029abe88f60ae7d2adc09371&units=metric`);
        return response.data.daily;
    }
}