import React, { useState } from 'react';
import '../css/styles.css';

const SearchBar = ({ onWeatherData }) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      setError(null);

      const API_KEY = "f5fec0946bc550184dec442698c35d67";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=is`);
      if (!response.ok) {
        setError("Staðsetningin finnst ekki");
        return;
      }
      const data = await response.json();
  
      onWeatherData(data);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Veður- og hitastigsstöð</h5>
      </div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Sláðu inn staðsetningu"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default SearchBar;