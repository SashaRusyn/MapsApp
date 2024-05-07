import { CategoryAction, CategoryActionTypes, CategoryState } from "../types/category";
import { GeoDataAction, GeoDataActionTypes, GeoDataState } from "../types/geoData";

const initialState: GeoDataState = {
    geoData: [],
    searchQuery: '',
    geoSearchObjects: [],
    geoSearchObject: null,
}

export const geoDataReducer = (state = initialState, action: GeoDataAction) => {
    switch (action.type) {
        case GeoDataActionTypes.SET_GEO_DATA:
            return { ...state, geoData: action.payload }
        case GeoDataActionTypes.SEARCH_QUERY_CHANGE:
            return { ...state, searchQuery: action.payload }
        case GeoDataActionTypes.GET_GEO_SEARCH_OBJECTS:
            return { ...state, geoSearchObjects: action.payload }
        case GeoDataActionTypes.SET_GEO_SEARCH_OBJECT:
            return { ...state, geoSearchObject: action.payload }
        default:
            return state;
    }
}