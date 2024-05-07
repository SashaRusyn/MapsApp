import { useDispatch } from "react-redux";
import { WeatherActionTypes } from "../types/weather";

const WeatherDay = (props: any) => {
    const minTemp = Math.floor(props.day.temp.min);
    const maxTemp = Math.floor(props.day.temp.max);
    const date = new Date();
    date.setDate(date.getDate() + props.date);
    const dispatch = useDispatch();

    const changeDay = () => {
        dispatch({ type: WeatherActionTypes.SET_SELECT_DAY, payload: props.date })
    }

    return (
        <div className={"weatherDay " + (props.active ? "active" : "")} onClick={changeDay}>
            <img src={`https://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`} alt="" />
            <div className="temp">
                <p>{maxTemp <= 0 ? maxTemp : "+" + maxTemp}</p>
                <p>{minTemp <= 0 ? minTemp : "+" + minTemp}</p>
            </div>
            <div>
                <p>{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.{(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}</p>
            </div>
        </div>
    )
}

export default WeatherDay;