const express = require('express');

const router = express.Router();
const { ensureUser, isAdmin } = require('../middlewares/auth');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/admin', ensureUser, isAdmin, (req, res, next) => {
  res.send('Admin page');
});

module.exports = router;
