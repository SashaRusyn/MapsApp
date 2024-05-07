import { VisibleAction, VisibleModalActionTypes, VisibleModalState } from "../types/visibleModal";

const initialState: VisibleModalState = {
    visibleWeather: false,
    visibleCategories: false,
    visibleSearch: false,
}

export const visibleModalReducer = (state = initialState, action: VisibleAction) => {
    switch (action.type) {
        case VisibleModalActionTypes.SET_VISIBLE_WEATHER:
            return { ...state, visibleWeather: action.payload }
        case VisibleModalActionTypes.SET_VISIBLE_CATEGORIES:
            return { ...state, visibleCategories: action.payload }
        case VisibleModalActionTypes.SET_VISIBLE_SEARCH:
            return { ...state, visibleSearch: action.payload }
        default:
            return state;
    }
}