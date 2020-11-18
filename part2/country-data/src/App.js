import React, {useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countryToShow, setCountryToShow ] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryToShow({})
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  const showCountryHandler = (country) => () => {
    setCountryToShow(country)
  }

  return (
    <div>
      find countries
      <input
        value={filter}
        onChange={handleFilterChange} />
      <Countries countries={countriesToShow} showCountryHandler={showCountryHandler} countryToShow={countryToShow} />
    </div>
  )
}

export default App;
