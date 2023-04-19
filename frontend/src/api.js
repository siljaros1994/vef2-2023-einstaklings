import { generateApiUrl } from './utils/generateApiUrl';

const API_URL = generateApiUrl("/api/weather");
const AUTH_API_URL = generateApiUrl("/auth");

export const fetchWeatherDataByLocation = async (location) => {
  const response = await fetch(`${API_URL}/${location}`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};

export const fetchWeatherDataByCoordinates = async (lat, lon) => {
  const response = await fetch(`${API_URL}/lat/${lat}/lon/${lon}`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  return await response.json();
};

export const registerUser = async (email, password) => {
  const response = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return await response.json();
};