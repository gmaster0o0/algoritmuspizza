const express = require('express');

const passport = require('passport');

const router = express.Router();

router.post('/login', (req, res, next) => {
  return passport.authenticate('local-login', { successRedirect: '/' })(req, res, next);
});

router.post('/register', (req, res, next) => {
  return passport.authenticate('local-register', { successRedirect: '/' })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});
module.exports = router;
