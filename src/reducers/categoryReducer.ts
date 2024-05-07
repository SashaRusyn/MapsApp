import { CategoryAction, CategoryActionTypes, CategoryState } from "../types/category";

const initialState: CategoryState = {
    category: "amenity",
    subcategory: "",
}

export const categoryReducer = (state = initialState, action: CategoryAction) => {
    switch (action.type) {
        case CategoryActionTypes.CATEGORY_CHANGE:
            return { ...state, category: action.payload }
        case CategoryActionTypes.SUBCATEGORY_CHANGE:
            return { ...state, subcategory: action.payload }
        default:
            return state;
    }
}