export interface GeoDataState {
    geoData: any[],
    searchQuery: string,
    geoSearchObjects: any[],
    geoSearchObject: any,
}

export enum GeoDataActionTypes {
    SET_GEO_DATA = "SET_GEO_DATA",
    SEARCH_QUERY_CHANGE = "SEARCH_QUERY_CHANGE",
    GET_GEO_SEARCH_OBJECTS = "GET_GEO_SEARCH_OBJECTS",
    SET_GEO_SEARCH_OBJECT = "SET_GEO_SEARCH_OBJECT"
}

interface SetGeoDataAction {
    type: GeoDataActionTypes.SET_GEO_DATA;
    payload: any[];
}

interface SearchQueryAction {
    type: GeoDataActionTypes.SEARCH_QUERY_CHANGE;
    payload: string;
}

interface GetGeoSearchObjectsAction {
    type: GeoDataActionTypes.GET_GEO_SEARCH_OBJECTS;
    payload: any[];
}

interface SetGeoSearchObjectAction {
    type: GeoDataActionTypes.SET_GEO_SEARCH_OBJECT;
    payload: any;
}

export type GeoDataAction = SetGeoDataAction | SearchQueryAction | GetGeoSearchObjectsAction | SetGeoSearchObjectAction;