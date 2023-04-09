import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import authRoutes from './auth/authRoutes.js';
//import passport from './auth/passport.js';

import {
  requireAuthentication,
  addUserIfAuthenticated,
  requireAdmin,
  tokenOptions,
  jwtOptions,
  passport
} from './auth/passport.js';

const app = express();
//const port = process.env.PORT || 3001;

const {
  PORT: port = 3001,
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString
} = process.env;

if (!connectionString || !sessionSecret) {
  console.error('Vantar gögn í .env');
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    maxAge: 20 * 1000 // 20 sek
  })
);

app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use('/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
