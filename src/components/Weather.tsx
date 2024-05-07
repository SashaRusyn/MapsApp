import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypeSelector";
import WeatherDay from "./WeatherDay";
import { useDispatch } from "react-redux";
import { WeatherActionTypes } from "../types/weather";

const Weather = () => {
    const forecast = useTypedSelector(state => state.weather.forecast);
    const selectDay = useTypedSelector(state => state.weather.selectDay);
    const icon = forecast[selectDay].weather[0].icon;
    const minTemp = forecast[selectDay].temp.min;
    const maxTemp = forecast[selectDay].temp.max;
    const humidity = forecast[selectDay].humidity;
    const clouds = forecast[selectDay].clouds;
    const pressure = forecast[selectDay].pressure;
    const windDeg = forecast[selectDay].wind_deg;
    const windSpeed = forecast[selectDay].wind_speed;
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WeatherActionTypes.SET_SELECT_DAY, payload: 0 });
    }, [dispatch, forecast]);

    useEffect(() => {
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + selectDay);
        setDate(newDate);
    }, [selectDay])

    return (
        <div>
            <div className="weatherDays">
                {forecast.map((day, index) => <WeatherDay day={day} key={index} date={index} active={index === selectDay}></WeatherDay>)}
            </div>
            <div className="dayInfo">
                <p>Date: {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth()}</p>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"></img>
                <p>Max temperature: {maxTemp} <sup>o</sup>C</p>
                <p>Min temperature: {minTemp} <sup>o</sup>C</p>
                <p>Humidity: {humidity} %</p>
                <p>Clouds: {clouds} %</p>
                <p>Pressure: {Math.floor(pressure * 0.750063755419211)} mm</p>
                <p>Wind: <i className="fa-solid fa-arrow-right" style={{ transform: `rotate(${windDeg - 90}deg)` }}></i> {windSpeed} m/s</p>
            </div>
        </div>
    )
}

export default Weather;