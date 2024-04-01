const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'your_secret_key'; // נא להחליף במפתח סודי אמיתי בסביבת ההפקה


const fs = require('fs');
const fsPromises = require('fs').promises;
// const u = require('./controllers/users.controller')

const requestDetails = (req, res, next) => {

  console.log('Time:', Date.now());
  console.log(`url log ${req.originalUrl}`);
  if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
    const error = new Error('No data sent in the request body');
    error.status = 400;
    next(error);
  }
  else {
    console.log("have body");
    next();
  }

};
// const verifyToken = (req, res, next) => {
//   const token = req.header('auth-token');
//   if (!token) {
//     return res.status(401).send('Access denied. Token not provided.');
//   }
//   //פונקציה שבודקת האם התוקן שהתקבל נכון
//   const verified = jwt.verify(token, 'config.TOKEN_SECRET');
//   req.user = verified;
//   console.log(verified)
//   users.forEach(e => {
//     if (e.id === verified.id)
//       next();
//   })
//   res.status(400).send('Invalid or expired token');
// }
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  console.log(token);
  if (!token) {
    return res.status(401).send('Access denied. Token not provided.');
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
const userExists = async(req, res, next) => {
  const { username } = req.body;
  const dataUsers = await fsPromises.readFile('./data/users.json');
  const users = JSON.parse(dataUsers);//u.getUsers()// נא להחליף במפתח סודי אמיתי בסביבת ההפקה
  // פונקציה שמחזירה את רשימת המשתמשים מקובץ
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    console.log(username);
    return res.status(400).send('User already exists.');
  }
  next();
};
module.exports = {
  requestDetails,
  verifyToken,
  userExists
};