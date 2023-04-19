import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as users from './users.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

async function strat(data, next) {
  const user = await users.findById(data.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
}

passport.use(new Strategy(jwtOptions, strat));

export function requireAuth(req, res, next) {
  return passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const error = info && info.name === 'TokenExpiredError' ?
          'expired token' : 'invalid token';

        return res.status(401).json({ error });
      }

      req.user = user;
      return next();
    },
  )(req, res, next);
}

export function requireAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
}

async function loginRoute(req, res) {
  const { email, password } = req.body;

  const validations = [];

  if (!users.isNotEmptyString(email)) {
    validations.push({
      field: 'email',
      error: 'Email is required',
    });
  }

  if (!users.isNotEmptyString(password)) {
    validations.push({
      field: 'password',
      error: 'Password is required',
    });
  }

  if (validations.length > 0) {
    return res.status(401).json(validations);
  }

  const user = await users.findByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'No such user' });
  }

  const passwordIsCorrect = await users.comparePasswords(password, user.password);

  if (passwordIsCorrect) {
    req.session.userId = user.id;
    delete user.password;
    return res.json(user);
  }

  return res.status(401).json({ error: 'Invalid password' });
}

export { loginRoute };