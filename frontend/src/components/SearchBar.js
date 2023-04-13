import React, { useState } from 'react';
import '../css/styles.css';
import generateApiUrl from '../../shared/generateApiUrl';

const SearchBar = ({ onWeatherData }) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      setError(null);

      const API_URL = generateApiUrl(`/api/weather/${location}`);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          setError("Staðsetningin finnst ekki");
          return;
        }
    
        const data = await response.json();
        onWeatherData(data);
      } catch (error) {
        console.error(error);
        setError('Villa kom upp við að sækja gögn');
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Veður- og hitastigs</h5>
      </div>
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Staðsetning"
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
