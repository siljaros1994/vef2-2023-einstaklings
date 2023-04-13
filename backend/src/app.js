import express from 'express';
import cors from 'cors';
import session from 'express-session';
import weatherRoutes from './routes/weather.js';
import authRoutes from './auth/authRoutes.js';
import passport from './auth/passport.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; 

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3001;

const {
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString
} = process.env;

dotenv.config();
if (!connectionString || !sessionSecret) {
  console.error('Vantar gögn í .env');
  process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
app.use(passport.session());
app.use('/api/weather', weatherRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
