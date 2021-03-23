const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    const {name, email, password, password2, gender} = req.body;
    let errors = [];
    console.log(gender);
    if (!name || !email || !password || !password2) {
        errors.push({msg: "Please fill in all the fields"});
    }
   
    if (password.length < 6) {
        errors.push({msg: "Password must contain at least 6 characters"});
    }
    if (password != password2) {
        errors.push({msg: "Passwords do not match"});
    }
    if (errors.length > 0) {
        res.render('register', {
            name,
            email,
            password,
            password2,
            errors,
            gender
            
        });
    } else {
        User.findOne({email: email}).then(user => {
            if (user) {
                errors.push({msg: "Email is already registered"});
                res.render('register', {
                    name,
                    email,
                    password,
                    password2,
                    errors,
                    gender

                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    gender
                });
                bcrypt.genSalt(10, (err, salt ) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash;
                    newUser.save().then(user => res.redirect('/login')).catch(err => console.log(err));
                }))
            }
        })

    }
};
const loginAuth = (req, res) => {
    const email = req.body.email;
    User.findOne({email: email}).then(user => {
        if (user) {
        bcrypt.compare(req.body.password, user.password, (err, resp) => {
            if (err) throw err;
            if (resp) {
                req.session.user = req.body.email;
                res.redirect('/todo');
                
            } else {
                res.render('login', {msg: 'Invalid details'})
            }
        })
    } else {
        res.render('login', {msg: 'Invalid details'})
    }
    })
    
}
module.exports = {
    createUser,
    loginAuth
}