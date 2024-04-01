const express = require('express');
const cors=require('cors');
const app = express();


const port = 3000;

const middleware = require('./middleware.js');

const bodyParser = require('body-parser');
const categories = require('./controllers/categories.controller');
const prodacts = require('./controllers/products.controller');
const users = require('./controllers/users.controller.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/categories', middleware.requestDetails,categories);
app.use('/products',middleware.requestDetails, prodacts);
app.use('/users', middleware.requestDetails/*,middleware.verifyToken*/, users);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});