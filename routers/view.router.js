const express = require('express');

const router = express.Router();
const { ensureUser } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.locals.user = req.user;
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/profile', ensureUser, (req, res, next) => {
  res.render('profile');
});

module.exports = router;
