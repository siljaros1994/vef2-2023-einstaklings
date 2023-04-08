import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTint, faWind } from '@fortawesome/free-solid-svg-icons';
import '../css/styles.css';

const WeatherItem = ({ icon, title, value }) => (
  <div className="weather-item" title={title}>
    <FontAwesomeIcon icon={icon} size="1.1x" />
    <span className="value">{value}</span>
  </div>
);

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};


const WeatherInfo = ({ data }) => {
  if (!data || !data.sys || !data.main || !data.wind || !data.clouds) {
    return <div className="weather-info">Loading weather data...</div>;
  }

  return (
    <div className="weather-info">
      <h5 className="card-title">
        Veður í {data.name}, {data.sys.country}
      </h5>
      <p className="card-text">Hitastig: {kelvinToCelsius(data.main.temp).toFixed(2)}°C</p>
      <p className="card-text">Loftþrýstingur: {data.main.pressure} hPa</p>
      <p className="card-text">Vindastefna: {data.wind.deg}°</p>
      <div className="weather-items"> {}
        <WeatherItem
          icon={faWind}
          title="Vindhraði"
          value={`${data.wind.speed} m/s`}
        />
        <WeatherItem
          icon={faTint}
          title="Rakastig"
          value={`${data.main.humidity}%`}
        />
        <WeatherItem
          icon={faCloud}
          title="Skýjahula"
          value={`${data.clouds.all}%`}
        />
      </div>
    </div>
  );
};

export default WeatherInfo;