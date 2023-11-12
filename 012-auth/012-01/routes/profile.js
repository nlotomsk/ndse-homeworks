const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');

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

router.get('/login', isLoggedOut, (req, res) => {

    const response = {

        title: "Login",

        error: req.query.error

    }

    res.render('auth/login', response);

});

router.post('/login', passport.authenticate('local', {

    successRedirect: '/',

    failureRedirect: '/api/user/login?error=true'

}));

router.get('/logout', isLoggedIn, (req, res, next) => {

    res.clearCookie('connect.sid'); 

    res.redirect('/');

});

router.get('/me', isLoggedIn, async (req, res) => {

    const user = await User.findOne({ _id: req.user });

    res.render('users/profile', {

        title: 'Профиль юзера',

        user: user

    })

});

router.get("/signup", function (req, res) {

    res.render("auth/register", {

        title: 'Форма регистрации'

    });

});

router.post("/signup", async (req, res) => {

    const { username, email, password } = req.body;

    if (username == ''|| email == '' || password == ''){

        return res.redirect('/api/user/signup');

    }

    let user = await User.findOne({ email });

    if (user) {

        return res.redirect('/signup');

    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new User({

        username,

        email,

        password: hashedPsw

    })

    await user.save();

    res.redirect('/api/user/login');
    
});

module.exports = router