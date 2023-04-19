import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { findByEmail } from '../middlewares/users.js';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await findByEmail(email);

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await findById(id);
  done(null, user);
});

export default passport;