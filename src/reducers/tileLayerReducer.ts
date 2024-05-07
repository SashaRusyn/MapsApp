import { TileLayerAction, TileLayerActionTypes, TileLayerState } from "../types/tileLayer";

const initialState: TileLayerState = {
    tileLayer: "obs",
}

export const tileLayerReducer = (state = initialState, action: TileLayerAction) => {
    switch (action.type) {
        case TileLayerActionTypes.TILE_LAYER_CHANGE:
            return { ...state, tileLayer: action.payload }
        default:
            return state;
    }
}