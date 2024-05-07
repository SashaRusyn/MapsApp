import { DistanceAction, DistanceActionTypes, DistanceState } from "../types/distance";

const initialState: DistanceState = {
    distance: 1,
}

export const distanceReducer = (state = initialState, action: DistanceAction) => {
    switch (action.type) {
        case DistanceActionTypes.DISTANCE_CHANGE:
            return { ...state, distance: action.payload }
        default:
            return state;
    }
}