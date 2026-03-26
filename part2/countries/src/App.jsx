import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = search
    ? countries.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : []

  return (
    <div>
      <Filter value={search} onChange={handleSearchChange} />
      
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesToShow.length === 1 ? (
        <CountryDetail country={countriesToShow[0]} />
      ) : (
        countriesToShow.map(country => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
        ))
      )}
    </div>
  )
}

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital ? country.capital[0] : 'N/A'}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="150" />
    </div>
  )
}

export default App