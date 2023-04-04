import React from 'react';

const WeatherInfo = ({ data }) => {
  return (
    <div className="mt-4">
      <h2>{data.name}, {data.sys.country}</h2>
      <p>Hitastig: {data.main.temp}°C</p>
      <p>Veður: {data.weather[0].description}</p>
      <p>Vindur: {data.wind.speed} m/s</p>
      <p>Rakastig: {data.main.humidity}%</p>
    </div>
  );
};

export default WeatherInfo;
