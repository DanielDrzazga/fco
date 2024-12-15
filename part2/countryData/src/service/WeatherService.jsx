import axios from 'axios'

const openWeatherKey = import.meta.env.VITE_OPEN_WEATHER_KEY

const getWeather = (latitude, longitude, exclude = 'daily', units= 'metric') => {

    console.log(import.meta.env)
    return axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${openWeatherKey}`)
}

export default {getWeather};