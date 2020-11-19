import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const WeatherInfo = ({ country }) => {
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}&units=f`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data.current)
      })
  }, [])

  if(weather.temperature === undefined) {
    return (
      <div>
        <p>Loading weather for {country.capital}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature: {weather.temperature}</p>
      <p><img src={weather.weather_icons[0]} alt={country.name + "weather"} width="75" height="75" /> </p>
      <p><b>Wind:</b> {weather.wind_speed}mph direction {weather.wind_dir}</p>
    </div>
  )
}

const CountryInfo = ({ country }) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h3>Languages:</h3>
      <ul>
      {country.languages.map((language) =>
        <li key={language.name}>{language.name}</li>
      )}
      </ul>
      <img src={country.flag} width="225" height="150" alt={country.name + "-flag"} />
      <WeatherInfo country={country} />
    </div>
  )
}

const Countries = ({ countries, showCountryHandler, countryToShow }) => {

  if(countryToShow.name !== undefined) {
    return (
      <CountryInfo country={countryToShow} />
    )
  }

  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if(countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        <ul>
          {countries.map((country) =>
            <li key={country.name}>
              {country.name} <button onClick={showCountryHandler(country)}>show</button>
            </li>
          )}
        </ul>
      </div>
    )
  }

  if(countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  return <p>No countries match!</p>
}

export default Countries
