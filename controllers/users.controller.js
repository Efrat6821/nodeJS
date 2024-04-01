const express = require('express');
const { Router } = require('express');

const middleware = require('../middleware.js')

const router = Router();
const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'your_secret_key'; // נא להחליף במפתח סודי אמיתי בסביבת ההפקה


const getUsers = async() => {
    const data = await fsPromises.readFile('./data/users.json');
    return JSON.parse(data);
}


router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    // const dataUsers = await fsPromises.readFile('./data/users.json');
    const users = await getUsers()//JSON.parse(dataUsers);
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).send('Invalid username or password.');
    }
    const token = jwt.sign({ username: user.username }, TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

router.post('/signup', middleware.userExists, async(req, res) => {
    const user = req.body;
    //const dataUsers = await fsPromises.readFile('./data/users.json');
    const users = await getUsers();//JSON.parse(dataUsers);
    console.log(users);
    users.push(user);
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.send('Signup successful');
});


router.get('/', middleware.verifyToken, (req, res) => {
    res.send(req.user);
});


module.exports = router;