export interface TileLayerState {
    tileLayer: string;
}

export enum TileLayerActionTypes {
    TILE_LAYER_CHANGE = "TILE_LAYER_CHANGE",
}

interface TileLayerChangeAction {
    type: TileLayerActionTypes.TILE_LAYER_CHANGE;
    payload: string;
}

export type TileLayerAction = TileLayerChangeAction;