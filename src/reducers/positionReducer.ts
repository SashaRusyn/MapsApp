import { PositionActionTypes, PositionState, PositionAction } from "../types/position"

const initialState: PositionState = {
    position: [0, 0],
    loadingPosition: true,
}

export const positionReducer = (state = initialState, action: PositionAction) => {
    switch (action.type) {
        case PositionActionTypes.FETCH_POSITION_SUCCESS:
            return { ...state, loadingPosition: false, position: action.payload }
        default:
            return state;
    }
}