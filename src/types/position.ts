export interface PositionState {
    position: number[];
    loadingPosition: boolean;
}

export enum PositionActionTypes {
    FETCH_POSITION_SUCCESS = "FETCH_POSITION_SUCCESS",
}

interface FetchPositionAction {
    type: PositionActionTypes.FETCH_POSITION_SUCCESS;
    payload: number[];
}

export type PositionAction = FetchPositionAction;