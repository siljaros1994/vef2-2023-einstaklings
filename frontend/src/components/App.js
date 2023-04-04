import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import SearchBar from './SearchBar';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Veður- og hitastigsstöð</h1>
      <SearchBar onWeatherData={handleWeatherData} />
      {weatherData && <WeatherInfo data={weatherData} />}
    </div>
  );
};

export default App;
