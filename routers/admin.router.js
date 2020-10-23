const express = require('express');

const { generatePassword, hashPassword } = require('../utils/password');

const router = express.Router();

const asyncwrapper = require('../utils/asyncwrapper');
const User = require('../models/userModel');
const PizzaModel = require('../models/pizzaModel');
const emailSender = require('../utils/email');
const { ensureUser, isAdmin } = require('../middlewares/auth');

router.use(ensureUser);
router.use(isAdmin);
/**
 * get all user
 */
router.get(
  '/users',
  asyncwrapper(async (req, res, next) => {
    const users = await User.find();
    res.locals.userList = users;
    res.render('./admin/users', { users });
  })
);
/**
 * Delete user
 */
router.get(
  '/users/delete/:id',
  asyncwrapper(async (req, res, next) => {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/admin/users');
  })
);
/**
 * Edit user data
 */
router.post(
  '/users/modify/:id',
  asyncwrapper(async (req, res, next) => {
    const { email, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { email: email, role: role });
    res.redirect('/admin/users');
  })
);
/**
 * reset user password
 */
router.get(
  '/users/passwordReset/:id',
  asyncwrapper(async (req, res, next) => {
    const generatedPassword = generatePassword(16);
    const user = await User.findByIdAndUpdate(req.params.id, { password: hashPassword(generatedPassword) });
    await emailSender.send('Algoritmus pizza új jelszó', generatePassword, user.email);
    res.redirect('/admin/users');
  })
);
/**
 * Render admin page
 */
router.get(
  '/',
  asyncwrapper(async (req, res, next) => {
    res.render('./admin/admin');
  })
);
/**
 * List all pizza
 */
router.get(
  '/pizzas',
  asyncwrapper(async (req, res, next) => {
    const pizzaList = await PizzaModel.find();
    res.render('./admin/pizzas', { pizzaList });
  })
);
/**
 * Create pizza
 */
router.post(
  '/pizzas',
  asyncwrapper(async (req, res, next) => {
    const { name } = req.body;
    const pizza = await PizzaModel.find({ name: name });
    if (pizza.length > 0) return next(new Error('Mar van ilyen pizza!'));
    PizzaModel.create(req.body);
    return res.redirect('/pizzas');
  })
);
/**
 * Delete Pizza
 */
router.get('/pizzas/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  const pizza = await PizzaModel.findByIdAndRemove(id);

  console.log(pizza);

  return res.redirect('/pizzas');
});
router.post('/pizzas/modify/:id', async (req, res, next) => {
  const { id } = req.params;
  const pizza = await PizzaModel.findByIdAndUpdate(id, req.body);

  console.log(pizza);

  return res.redirect('/admin/pizzas');
});

module.exports = router;
