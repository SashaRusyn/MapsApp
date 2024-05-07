import { WeatherAction, WeatherActionTypes, WeatherState } from "../types/weather"

const initialState: WeatherState = {
    forecast: [],
    selectDay: 0,
}

export const weatherReducer = (state = initialState, action: WeatherAction) => {
    switch (action.type) {
        case WeatherActionTypes.SET_FORECAST:
            return { ...state, forecast: action.payload }
        case WeatherActionTypes.SET_SELECT_DAY:
            return { ...state, selectDay: action.payload }
        default:
            return state;
    }
}