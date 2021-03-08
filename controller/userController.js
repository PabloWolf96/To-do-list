const User = require('../models/user');

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
                console.log(newUser);
                res.send('hello');
            }
        })

    }
};
module.exports = createUser;