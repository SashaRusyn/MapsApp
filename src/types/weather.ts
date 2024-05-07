export interface WeatherState {
    forecast: any[],
    selectDay: number,
}

export enum WeatherActionTypes {
    SET_FORECAST = "SET_FORECAST",
    SET_SELECT_DAY = "SET_SELECT_DAY",
}

interface ForecastAction {
    type: WeatherActionTypes.SET_FORECAST;
    payload: any[];
}

interface SelectDayAction {
    type: WeatherActionTypes.SET_SELECT_DAY;
    payload: number;
}

export type WeatherAction = ForecastAction | SelectDayAction;