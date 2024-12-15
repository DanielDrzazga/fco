const CountryDetails = ({country}) => {
    return (<>
        <h3>{country.name.common}</h3>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h5>languages</h5>
        <ul>
            {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
            ))}
        </ul>


        <img src={country.flags.png} style={{border: `solid`}}/>
    </>)
}

export default CountryDetails;