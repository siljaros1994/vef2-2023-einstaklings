import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import AddLocation from './AddLocation';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  return (
    <div id="app" className="app">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Veður- og hitastigsstöð</h5>
        </div>
        <div className="card-body">
          <AddLocation onAddLocation={handleWeatherData} />
          {weatherData && <WeatherInfo data={weatherData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
