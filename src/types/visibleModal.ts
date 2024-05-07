export interface VisibleModalState {
    visibleWeather: boolean;
    visibleCategories: boolean;
    visibleSearch: boolean;
}

export enum VisibleModalActionTypes {
    SET_VISIBLE_WEATHER = "SET_VISIBLE_WEATHER",
    SET_VISIBLE_CATEGORIES = "SET_VISIBLE_CATEGORIES",
    SET_VISIBLE_SEARCH = "SET_VISIBLE_SEARCH",
}

interface VisibleWeatherAction {
    type: VisibleModalActionTypes.SET_VISIBLE_WEATHER;
    payload: boolean;
}

interface VisibleCategoriesAction {
    type: VisibleModalActionTypes.SET_VISIBLE_CATEGORIES;
    payload: boolean;
}

interface VisibleSearchAction {
    type: VisibleModalActionTypes.SET_VISIBLE_SEARCH;
    payload: boolean;
}

export type VisibleAction = VisibleWeatherAction | VisibleCategoriesAction | VisibleSearchAction;