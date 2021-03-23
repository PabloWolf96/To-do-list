const express = require('express');
const route = express.Router();
const control = require('../controller/userController');

route.get('/todo', (req, res) => {
    if (req.session.user) {
      
        res.render('to-do');
    } else {
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
route.post('/register', control.createUser);
route.post('/login', control.loginAuth);
route.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/login');
});

module.exports = route;