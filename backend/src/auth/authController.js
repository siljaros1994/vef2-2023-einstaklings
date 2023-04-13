import jwt from 'jsonwebtoken';
import { createUser, comparePasswords, findByUsername } from './users.js';
import { jwtOptions, tokenOptions } from './passport.js';

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing username, email, or password' });
  }

  const existingUser = await findByUsername(username);

  if (existingUser) {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  try {
    const user = await createUser(username, email, password);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const user = await findByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isCorrectPassword = await comparePasswords(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, tokenOptions);

  return res.status(200).json({ token, user });
}

export { register, login };