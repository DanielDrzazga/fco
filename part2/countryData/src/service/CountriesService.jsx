import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios
    .get(baseUrl + '/all')
}

const getByName = ({countriesName}) => {
    return axios
    .get(baseUrl + '/name/' + countriesName)
}

export default {getAll, getByName};