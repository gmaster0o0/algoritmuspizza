const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { hashPassword, comparePassword } = require('./utils/password');
const User = require('./models/userModel');

const loginStrategy = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await await User.findOne({ email: email }).select('+password');
    if (!user) return done(new Error('Incorrect username or password'), false);
    const isCorrect = await comparePassword(password, user.password);
    if (!isCorrect) return done(new Error('Incorrect username or password'), false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, u, p, done) => {
    try {
      const { email, password, passwordConfirm } = req.body;

      if (password !== passwordConfirm) return done(new Error('A jelszók nem egyenlőek!'), false);
      const user = await User.findOne({ email: email });

      if (user) return done(new Error('User is already registered!'), false);

      const hashedPassword = await hashPassword(password);

      const rUser = await User.create({ email, password: hashedPassword });

      return done(null, rUser);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use('local-login', loginStrategy);
passport.use('local-register', registerStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = () => {
  passport.use('local-login', loginStrategy);
  passport.use('local-register', registerStrategy);

  return passport;
};
