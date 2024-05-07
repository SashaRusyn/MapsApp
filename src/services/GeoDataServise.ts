import axios from "axios";

export default class GeoDataService {
    static async getGeoObjects(position: number[], distance: number, key: string, value: string) {
        const response = await axios.get(`http://overpass-api.de/api/interpreter?data=[out:json];(node["${key}"="${value}"](around:${distance * 1000},${position[0]},${position[1]}););out;`);
        return response.data.elements;
    }

    static async getSearchObjects(position: number[], distance: number, value: string) {
        const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];node[name~"${value}"](around:${distance * 1000},${position[0]},${position[1]});out;`);
        return response.data.elements;
    }
}