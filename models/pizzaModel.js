const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: true
  },
  ingidients: {
    type: [String],
    required: true
  },
  picture: {
    type: String
  }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
