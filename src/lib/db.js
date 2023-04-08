const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  end: () => pool.end(),
};
