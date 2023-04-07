import React from 'react';

const SearchHistory = ({ history }) => {
  return (
    <div>
      <h5>Search History:</h5>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.location} - {item.timestamp.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
