const path = require('path');
const express = require('express');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const authRoute = require('./routers/auth.router');
const viewRoute = require('./routers/view.router');

const authConfig = require('./authConfig');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat' }));
app.use(authConfig().initialize());
app.use(authConfig().session());
app.use(flash());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/', viewRoute);

app.all('*', (req, res, next) => {
  res.send('Az oldal nem talalhato');
});

app.use((error, req, res, next) => {
  res.render('error', { error: error });
});
module.exports = app;
