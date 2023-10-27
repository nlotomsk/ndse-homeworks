const express = require('express');
const router = express.Router();
// const session = require('express-session')
// //const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy

router.get('/',
    (req, res, next) => {
              if (!req.isAuthenticated()) {
                return res.redirect('/api/user/login/')
              }
              next()
            },
        (req, res) => {
            res.render('index', {
                title: 'Главная библиотека',
            })
        });

module.exports = router;

// app.get('/profile',
//     (req, res, next) => {
//       if (!req.isAuthenticated()) {
//         return res.redirect('/login')
//       }
//       next()
//     },
//     (req, res) => {
//       res.render('profile', {
//         user: req.user
//     })
//     }
// )