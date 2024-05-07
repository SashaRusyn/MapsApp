import { combineReducers } from "redux";
import { positionReducer } from "./positionReducer";
import { tileLayerReducer } from "./tileLayerReducer";
import { distanceReducer } from "./distanceReducer";
import { visibleModalReducer } from "./visibleModalReducer";
import { weatherReducer } from "./weatherReducer";
import { categoryReducer } from "./categoryReducer";
import { geoDataReducer } from "./geoDataReducer";


export const rootReducer = combineReducers({
    position: positionReducer,
    tileLayer: tileLayerReducer,
    distance: distanceReducer,
    visibleModal: visibleModalReducer,
    weather: weatherReducer,
    category: categoryReducer,
    geoData: geoDataReducer
});

export type RootState = ReturnType<typeof rootReducer>