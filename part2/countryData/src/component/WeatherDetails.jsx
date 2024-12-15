import { useEffect, useState } from 'react';
import WeatherService from '../service/WeatherService';

const WeatherDetails = ({country}) => {
    const [weather, setWeather] = useState([])
    const {capital} = country;
    const {capitalInfo} = country;
    const {latlng} = capitalInfo;

    useEffect(() => {
        WeatherService
        .getWeather(latlng[0], latlng[1])
        .then((res) => {setWeather(res.data)})
      },[])

    return (<>
        <h3>Weather in {capital[0]}</h3>
        <p>temperature {weather.temp}</p>
        <p>wind {weather.current.wind_speed} m/s</p>
    </>)
}

export default WeatherDetails;