const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const User = require('./model/user');

require('dotenv').config();

const errorMiddleware = require('./middlewafe/404');

const booksApiRouter = require('./routes/books-api')
const booksRouter = require('./routes/books')
const profileRouter = require('./routes/profile')

////////------------------////////
////////----Middleware----////////
////////------------------////////
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const urlDB = "mongodb://localhost:27018/books"

mongoose.connect(urlDB)
    .then((res) => {

        console.log("connect");

    });

app.use(session({

    secret: 'secret',

    resave: false,

    saveUninitialized: false,

})

);

////////----------------////////
////////----Passport----////////
////////----------------////////

passport.serializeUser(async (user, done) => {

    await done(null, user.id);

});

passport.deserializeUser(async (id, done) => {

    try {

        const user = await User.findOne({ _id: id });

        return done(null, user.id);

    } catch (err) {

        next(err);

    }

});

const options = {

    usernameField: "email",

    passwordField: "password",

}

passport.use(new LocalStrategy(options, async (email, password, done,) => {

    let user = await User.findOne({ email: email });

    if (!user) {

        return done(null, false, { message: 'Incorrect username.' });

    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

        return done(null, false, { message: 'Incorrect password.' });

    }

    return done(null, user);

}));

app.use(passport.initialize());

app.use(passport.session());

////////----------------------------------------////////
////////----Проверка авторизации для страниц----////////
////////----------------------------------------////////

const isLoggedIn = (req, res, next) => {

    if (req.isAuthenticated()) {

        console.log("Авторизован");

        next();

    } else {

        console.log("Не авторизован");

        return res.redirect('/api/user/login');

    }

};

function isLoggedOut(req, res, next) {

    if (!req.isAuthenticated()) return next();

    res.redirect('/');

};

app.get('/', (req, res) => {

    res.render('index', {

        title: 'Главная библиотека',

    })

});

////////---------------------////////
////////----profileRouter----////////
////////---------------------////////

app.use('/books', isLoggedIn, booksRouter);

app.use('/api/user/', profileRouter)

app.use('/api/books', booksApiRouter)

app.use(errorMiddleware);


app.listen(3001, console.log("Server Running on localhost:3001"));
