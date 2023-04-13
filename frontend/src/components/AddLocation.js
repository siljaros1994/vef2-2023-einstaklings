import React, { useState } from 'react';
import { generateApiUrl } from '../utils/generateApiUrl';
import '../css/styles.css';

const AddLocation = ({ onAddLocation }) => {
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(null);


  const handleAdd = async () => {
    const API_URL = generateApiUrl(`/api/weather/${location}?lang=${language}`);

    const response = await fetch(API_URL);
    if (!response.ok) {
      setError("Staðsetningin finnst ekki");
      return;
    }
  
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Error: Response is not JSON");
      console.error(await response.text());
      setError("Villa kom upp við að sækja gögn");
      return;
    }
  
    onAddLocation(data);
  };   

  const placeholderText =
    language === 'en' ? 'Enter location' : 'Staðsetning';

  return (
    <form onSubmit={handleAdd} className="form-group">
      <div className="search-bar-container">
        <input
          type="text"
          className="form-control"
          placeholder={placeholderText}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="language-select"></label>
        <select
            id="language-select"
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            <option value="en">English</option>
            <option value="is">Íslenska</option>
        </select>
        {error && <div className="error-message">{error}</div>}
      </div>
    </form>
  );
};

export default AddLocation;
