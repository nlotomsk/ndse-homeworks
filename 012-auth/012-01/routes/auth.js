const express = require('express')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Auth = require('../model/auth')
router.get('/', (req,res) => {
    res.render('auth/login')
})

const verify = (username, password, done) => {
    Auth.users.findByUsername(username, (err, user) => {
        if (err) {return done(err)}
        if (!user) { return done(null, false) }
  
        if( !db.users.verifyPassword(user, password)) {
            return done(null, false)
        }
  
        return done(null, user)
    })
  }
  
  const options = {
    username: "username",
    password: "password",
  }
  
  passport.use('local', new LocalStrategy(options, verify))
  
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
  
  passport.deserializeUser( (id, cb) => {
    db.users.findById(id,  (err, user) => {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

// router.post('auth/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   (req, res) => {
//     console.log("req.user: ", req.user)
//     res.redirect('/')
//   })

module.exports = router