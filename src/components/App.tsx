import '../styles/App.scss';
import { Circle, MapContainer, Marker, Popup, ScaleControl, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import MyButton from './UI/Button/MyButton';
import MySelect from './UI/Select/MySelect';
import MyLoader from './UI/Loader/MyLoader';
import MyModal from './UI/Modal/MyModal';
import MySearch from './UI/Search/MySearch';
import Weather from './Weather';
import Categories from './Categories';
import InfoCart from './InfoCart';
import { PositionActionTypes } from '../types/position';
import { TileLayerActionTypes } from '../types/tileLayer';
import { VisibleModalActionTypes } from '../types/visibleModal';
import { DistanceActionTypes } from '../types/distance';
import { WeatherActionTypes } from '../types/weather';
import { useFetching } from '../hooks/useFetching';
import { GeoDataActionTypes } from '../types/geoData';
import WeatherService from '../services/WeatherServise';
import GeoDataService from '../services/GeoDataServise';

const App = () => {
  const { position, loadingPosition } = useTypedSelector(state => state.position);
  const tileLayer = useTypedSelector(state => state.tileLayer.tileLayer)
  const distance = Number(useTypedSelector(state => state.distance.distance));
  const { visibleWeather, visibleCategories, visibleSearch } = useTypedSelector(state => state.visibleModal);
  const weather = useTypedSelector(state => state.weather.forecast);

  const category = useTypedSelector(state => state.category.category);
  const subcategory = useTypedSelector(state => state.category.subcategory);
  const geoData = useTypedSelector(state => state.geoData.geoData);
  const searchQuery = useTypedSelector(state => state.geoData.searchQuery);
  const searchedObjects = useTypedSelector(state => state.geoData.geoSearchObjects);
  const searchedObject = useTypedSelector(state => state.geoData.geoSearchObject);
  const categories = ["amenity", "building", "historic", "leisure", "natural", "office", "shop", "tourism"];

  const dispatch = useDispatch();

  const tileLayers: Record<string, string> = {
    obs: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    hot: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    topography: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    image: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    smooth_dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }
  const distances = [1, 2, 5, 10, 15, 25];
  const defaultIcon = L.icon({
    iconUrl: 'public/marker-icon.png',
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => { dispatch({ type: PositionActionTypes.FETCH_POSITION_SUCCESS, payload: [location.coords.latitude, location.coords.longitude] }) });
  }, []);

  useEffect(() => {
    if (typeof fetchWeather === 'function') {
      fetchWeather();
    }
  }, [visibleWeather])

  useEffect(() => {
    if (typeof fetchGeoObjects === 'function' && category.length !== 0) {
      fetchGeoObjects();
    }
    dispatch({ type: GeoDataActionTypes.SET_GEO_SEARCH_OBJECT, payload: null })
  }, [subcategory, distance]);

  useEffect(() => {
    if (searchQuery.length !== 0 && typeof fetchSearch === 'function') {
      fetchSearch();
    } else {
      dispatch({ type: GeoDataActionTypes.GET_GEO_SEARCH_OBJECTS, payload: [] })
    }
  }, [searchQuery]);

  const [fetchWeather, errorWeather, loadingWeather] = useFetching(async () => {
    if (weather.length === 0) {
      const response = await WeatherService.getWeather(position);
      dispatch({ type: WeatherActionTypes.SET_FORECAST, payload: response })
    }
  })

  const [fetchGeoObjects, errorGeoData, loadingGeoData] = useFetching(async () => {
    const response = await GeoDataService.getGeoObjects(position, distance, category, subcategory);
    dispatch({ type: GeoDataActionTypes.SET_GEO_DATA, payload: response })
  })

  const [fetchSearch, errorSearch, loadingSearch] = useFetching(async () => {
    const response = await GeoDataService.getSearchObjects(position, distance, searchQuery);
    dispatch({ type: GeoDataActionTypes.GET_GEO_SEARCH_OBJECTS, payload: response })
  })

  const setTileLayer = (newValue: string) => {
    dispatch({ type: TileLayerActionTypes.TILE_LAYER_CHANGE, payload: newValue })
  }

  const setDistance = (newValue: number) => {
    dispatch({ type: DistanceActionTypes.DISTANCE_CHANGE, payload: newValue })
  }

  const clickSearchObject = (object: any) => {
    dispatch({ type: GeoDataActionTypes.SET_GEO_DATA, payload: [] });
    dispatch({ type: VisibleModalActionTypes.SET_VISIBLE_SEARCH, payload: false });
    dispatch({ type: GeoDataActionTypes.SET_GEO_SEARCH_OBJECT, payload: object });
  }

  return (
    <div className="App">
      <MyModal type={VisibleModalActionTypes.SET_VISIBLE_WEATHER} visible={visibleWeather}>
        {weather.length !== 0 ? <Weather></Weather> : <MyLoader></MyLoader>}
      </MyModal>

      <MyModal type={VisibleModalActionTypes.SET_VISIBLE_CATEGORIES} visible={visibleCategories}>
        <Categories></Categories>
      </MyModal>

      <MyModal type={VisibleModalActionTypes.SET_VISIBLE_SEARCH} visible={visibleSearch}>
        <MySearch></MySearch>
        {loadingSearch ? <MyLoader></MyLoader> : (searchedObjects.length !== 0) ?
          <ul className="searchedObjects">{searchedObjects.map((object: any) => <li className="searchedObject w-full px-4 py-2 border-b border border-gray-200 dark:border-gray-600 cursor-pointer" onClick={() => { clickSearchObject(object) }}> {object.tags.name}</li>)}
          </ul> : <p className="w-full px-4 py-2 borber-b border border-gray-200 dark:border-gray-600 text-center">Нічого не знайдено</p>}
      </MyModal>

      {loadingPosition ? <MyLoader></MyLoader> : <MapContainer center={[position[0], position[1]]} zoom={13}>

        <TileLayer attribution="&copy; <a href=\'https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" noWrap={true} url={tileLayers[tileLayer]} />
        <ScaleControl position="topleft" />

        <MyButton position={{ left: '10px', bottom: '50px' }} onclick={() => dispatch({ type: VisibleModalActionTypes.SET_VISIBLE_CATEGORIES, payload: true })}>
          <i className="fa-solid fa-building"></i>
        </MyButton>

        <MyButton position={{ right: '10px', bottom: '25px' }} onclick={() => dispatch({ type: VisibleModalActionTypes.SET_VISIBLE_WEATHER, payload: true })}>
          <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" />
        </MyButton>

        <MyButton position={{ right: '10px', top: '50px' }} onclick={() => dispatch({ type: VisibleModalActionTypes.SET_VISIBLE_SEARCH, payload: true })}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </MyButton>

        <MySelect position={{ top: "10px", right: "10px" }} options={Object.keys(tileLayers)} value={tileLayer} setOption={(e) => setTileLayer(e.target.value)}>
        </MySelect>

        <MySelect position={{ bottom: '10px', left: '10px' }} options={distances} value={distance} setOption={(e) => setDistance(Number(e.target.value))} unit={' km'}></MySelect>

        <Circle center={[position[0], position[1]]} radius={Number(distance) * 1000} >
          <Popup>
            Your area of search
          </Popup>
        </Circle>

        {geoData.length !== 0 ? geoData.map((object: any, index) =>
          <Marker key={index} position={[object.lat, object.lon]} icon={defaultIcon}>
            <Popup>
              <InfoCart type={subcategory} tags={object.tags}></InfoCart>
            </Popup>
          </Marker>
        ) : null}

        {searchedObject ? <Marker position={[searchedObject.lat, searchedObject.lon]}>
          <Popup>
            <InfoCart type={searchedObject.tags[categories.find(key => searchedObject.tags.hasOwnProperty(key))!]} tags={searchedObject.tags}></InfoCart>
          </Popup>
        </Marker> : null}

      </MapContainer>}
    </div >
  );
}


export default App;
