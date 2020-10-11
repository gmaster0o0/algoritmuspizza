const express = require('express');

const { generatePassword, hashPassword } = require('../utils/password');

const router = express.Router();
const User = require('../models/userModel');
const emailSender = require('../utils/email');
const { ensureUser, isAdmin } = require('../middlewares/auth');

router.use(ensureUser);
router.use(isAdmin);

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.locals.userList = users;
    res.render('./admin/users', { users });
  } catch (e) {
    res.status(500).json({ status: 'Error', message: e });
  }
});

router.get('/users/delete/:id', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/admin/users');
  } catch (e) {
    res.status(500).json({ status: 'Error', message: e });
  }
});

router.post('/user/modify/:id', async (req, res, next) => {
  try {
    const { email, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { email: email, role: role });
    res.redirect('/admin/users');
  } catch (e) {
    res.status(500).json({ status: 'Error', message: e });
  }
});

router.get('/user/passwordReset/:id', async (req, res, next) => {
  try {
    const generatedPassword = generatePassword(16);

    const user = await User.findByIdAndUpdate(req.params.id, { password: hashPassword(generatedPassword) });
    await emailSender.send('Algoritmus pizza új jelszó', generatePassword, user.email);
    res.redirect('/admin/users');
  } catch (e) {
    res.status(500).json({ status: 'Error', message: e });
  }
});

module.exports = router;
