const mongoose = require('mongoose');
const { Category, Product } = require('./models'); 


mongoose.connect('mongodb://localhost:27017/store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = {mongoose, Category, Product};