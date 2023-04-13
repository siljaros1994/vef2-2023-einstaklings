import express from "express";
import axios from "axios";
const router = express.Router();

const API_KEY = "f5fec0946bc550184dec442698c35d67";

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      res.json(weatherResponse.data);
  } catch (error) {
      res.status(500).json({ error: 'Villa við að sækja veðurupplýsingar' });
  }
});

router.get('/lat/:lat/lon/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      res.json(weatherResponse.data);
  } catch (error) {
      res.status(500).json({ error: 'Villa við að sækja veðurupplýsingar' });
  }
});

export default router;
