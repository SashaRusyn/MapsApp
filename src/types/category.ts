export interface CategoryState {
    category: string;
    subcategory: string;
}

export enum CategoryActionTypes {
    CATEGORY_CHANGE = "CATEGORY_CHANGE",
    SUBCATEGORY_CHANGE = "SUBCATEGORY_CHANGE",
}

interface CategoryChangeAction {
    type: CategoryActionTypes.CATEGORY_CHANGE;
    payload: string;
}

interface SubcategoryChangeAction {
    type: CategoryActionTypes.SUBCATEGORY_CHANGE;
    payload: string;
}

export type CategoryAction = CategoryChangeAction | SubcategoryChangeAction;