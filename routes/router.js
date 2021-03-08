const express = require('express');
const route = express.Router();
const createUser = require('../controller/userController');

route.get('/todo', (req, res) => {
    if (!req.session) {
        res.redirect('/login');
    }
});
route.get('/', (req, res) =>{
    res.redirect('/todo');
});
route.get('/login', (req, res)=> {
    res.render('login');
});
route.get('/register', (req, res) =>{
    res.render('register')
});
route.post('/register', createUser);

module.exports = route;