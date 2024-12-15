import { useEffect, useState } from 'react'
import Filter from './component/Filter'
import CountriesService from './service/CountriesService';
import Countries from './component/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    CountriesService
    .getAll()
    .then((res) => {setCountries(res.data)})
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountriesDetail = (countryName) => {
    setFilter(countryName)
  }

  const countriesToShow = filter.length > 0 ? countries.filter((country) =>country.name.common.toLowerCase().includes(filter.toLowerCase())) : countries;

  return (
    <>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} showCountriesDetail={showCountriesDetail}/>
    </>
  )
}

export default App
