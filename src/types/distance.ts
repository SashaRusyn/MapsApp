export interface DistanceState {
    distance: number;
}

export enum DistanceActionTypes {
    DISTANCE_CHANGE = "DISTANCE_CHANGE",
}

interface DistanceChangeAction {
    type: DistanceActionTypes.DISTANCE_CHANGE;
    payload: string;
}

export type DistanceAction = DistanceChangeAction;