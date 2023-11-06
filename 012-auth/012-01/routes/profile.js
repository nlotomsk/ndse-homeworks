const express = require('express')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
//const LocalStrategy = require('passport-local').Strategy
//const Auth = require('../model/auth')

router.get('/', (req, res) => {
    res.render('users/profile', {
        title: 'Профиль юзера',
        user: req.user
    })
    console.log(req.user);
});

module.exports = router