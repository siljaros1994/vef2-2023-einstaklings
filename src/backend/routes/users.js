const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Villa við að sækja notendur' });
  }
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Villa við að búa til nýjan notanda' });
  }
});

module.exports = router;
