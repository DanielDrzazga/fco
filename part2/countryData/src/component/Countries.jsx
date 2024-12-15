import CountryDetails from './CountryDetails'
import WeatherDetails from './WeatherDetails'

const Countries = ({countries, showCountriesDetail}) => {
    if (countries.length > 10) {
        return (
            <p>To many matches, specify another filter</p>
        )
    }

    if (countries.length > 1) {
        console.log(countries.length > 1)
        return (<>
            {countries.map((country) => (
                <div key={country.name.common}>
                    <label>{country.name.common} </label>
                    <button onClick={() => showCountriesDetail(country.name.common)}>show</button>
                </div>
            ))}
        </>)
    }

    if (countries.length == 1) {
        return (<>
            <CountryDetails country={countries[0]} />
            <WeatherDetails country={countries[0]} />
        </>
    )}
}

export default Countries;