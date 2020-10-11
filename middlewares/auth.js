const ensureUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }
  return next(new Error('Nem vagy admint teeeeeee'));
};

module.exports = {
  isAdmin: isAdmin,
  ensureUser: ensureUser
};
