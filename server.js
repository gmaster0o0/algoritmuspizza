const dontenv = require('dotenv');
const http = require('http');
const mongoose = require('mongoose');
dontenv.config();

const app = require('./app');

const httpServer = http.createServer(app);

const port = process.env.PORT || 3000;

mongoose
  .connect('mongodb://localhost:27017/pizzeria', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Csatlakozva a pizzeria DBhez'));

httpServer.listen(port, () => {
  console.log(`HTTP server elindult a ${port}-on`);
});
