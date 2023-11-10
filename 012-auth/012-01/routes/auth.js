const express = require('express')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
//const LocalStrategy = require('passport-local').Strategy
const User = require('../model/user')

router.get('/', (req,res) => {
    // req.session.isAuth = true;
    // console.log(req.session);
    console.log('Пошел на форму авторизации');
    res.render('auth/login', {
        title: 'Login'
    })
})

// router.post("/", passport.authenticate('local'),
// // ,{
    
// //     successRedirect: "/secret",
// //     failureRedirect: "/login"
// // })
// function(req, res){
//     res.statusCode = 200;
// //   //res.setHeader('Content-Type', 'application/json');
// //   res.json({success: true, status: 'You are successfully logged in!'});
// });
// router.post("/", passport.authenticate("local",{
    
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }), function(req, res){
//     console.log("author");
// });
// router.post('/', (req, res, next) => {
//     console.log(req.body.user);
//     const user = req.body.username
//     //console.log("req.user: ", req.body.username)
//     passport.authenticate('local', function (err, user) {

//         console.log(user);
//         //console.log(err);
//         if (err) {
//             console.log(err);
//             return next(err);
//         }
//         if (!user) {
//             return res.send('Укажите правильный email или пароль!');
//         }
//         req.logIn(user, function (err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/books');
//         });
//     })(req, res, next);
// });

// const verify = (username, password, done) => {
//     Auth.users.findByUsername(username, (err, user) => {
//         if (err) {return done(err)}
//         if (!user) { return done(null, false) }
  
//         if( !db.users.verifyPassword(user, password)) {
//             return done(null, false)
//         }
  
//         return done(null, user)
//     })
//   }
  
//   const options = {
//     username: "username",
//     password: "password",
//   }
  
//   passport.use('local', new LocalStrategy(options, verify))
  
//   passport.serializeUser((user, cb) => {
//     cb(null, user.id)
//   })
  
//   passport.deserializeUser( (id, cb) => {
//     db.users.findById(id,  (err, user) => {
//       if (err) { return cb(err) }
//       cb(null, user)
//     })
//   })

// router.post('auth/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   (req, res) => {
//     console.log("req.user: ", req.user)
//     res.redirect('/')
//   })

module.exports = router