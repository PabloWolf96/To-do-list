const express = require('express');
const path = require('path');
const router = require('./routes/router');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'})

const PORT = process.env.PORT || 3000
const app = express();
app.set('view engine', 'ejs');
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Database is ready')).catch(err => console.log(err));
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/assets/img')));
app.use('/', router);


app.listen(PORT, ()=> console.log('Server is running on'));