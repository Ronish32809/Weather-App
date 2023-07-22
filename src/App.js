import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
import tempImage from './assets/temp.png';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5eebde1fe0fbe20de343a4a7a845cb37`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  // Kelvin to Celcius 
  const toCelsius = (tempKelvin) => {
    return (tempKelvin - 273).toFixed(2);
  }

  return (
    <div className='app' >
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text" />
      </div>
      <div className="container">
        <div className="location">
          <span>{data.name}</span>
        </div>
        <div className="sub-container">
          <div className="left-container">

            <div className="img">
              <img src={tempImage} alt="thermometer " />
            </div>
            <div className="temp">
              {data.main ? <p>{toCelsius(data.main.temp)}°C</p> : null}

              <div className="min-temp">
                <span>Min : {data.main ? toCelsius(data.main.temp_min) + "°C" : null} </span>
              </div>
              <div className="max-temp">
                <span>Max : {data.main ? toCelsius(data.main.temp_max) + "°C" : null}  </span>
              </div>
            </div>
          </div>
          <div className="right-container">

            <div className="Pressure">
              {data.main ? <p>{data.main.pressure}</p> : null}
              <p>Pressure</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity </p>
            </div>
          </div>
        </div>
        <div className="description">
          {data.weather ? <h1>{data.weather[0].main}</h1> : null}
        </div>



      </div>
    </div >

  );
}



export default App;
