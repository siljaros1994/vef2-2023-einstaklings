import bcrypt from 'bcrypt';
import { createUser, findByEmail } from '../middlewares/users.js';

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing username, email, or password' });
  }

  const existingUser = await findByEmail(email);

  if (existingUser) {
    return res.status(400).json({ error: 'Email is already taken' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user' });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const user = await findByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  console.log(user.password)

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  req.login(user, (err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ message: 'Logged in successfully', user });
  });
}

export { register, login };