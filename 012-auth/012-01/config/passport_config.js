const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const userDB = require('../model/auth')
const crypto = require('crypto');
const mongoose = require('mongoose')
const User = require('../model/auth')

// const userDB = {
//   id: 136345,
//   user: 'admin',
//   password: 'admin',
// };
//passport.use(new LocalStrategy(userDB.authenticate()));
//--------------------------------------------

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const options = {
//   usernameField: "user",
//   passwordField: "password",
// }

// passport.use(
//   new LocalStrategy(options, async function (
//     user,
//     password,
//     done
//   ) {
//     //const { id } = req.params
    
//     const userAuth = await userDB.findOne({ user: user }).select('-__v')
//     console.log(userAuth)
//     // if (books !== -1) {
//     //   console.log(id)
//     //   res.render("./books/view", {
//     //     title: "Books | view",
//     //     books: books,
//     //   })
//       console.log(`username: ` + user);
//       console.log(`password: ` + password);
//       console.log(`username: ` + userAuth.user);
//       console.log(`password: ` + userAuth.password);
//       if (user === userAuth.user && password === userAuth.password) {
//         return done(null, userAuth);
//       } else {
//         return done(null, false);
//       }
//     })
// );
// //-------------------------------

// // passport.serializeUser(userDB.serializeUser());
// // passport.deserializeUser(userDB.deserializeUser());


// passport.serializeUser(function (user, done) {
//   console.log('Сериализация: ', user.id);
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   console.log('Десериализация: ', id);
//   userDB.findOne({id:id}, function(err, user) {
//     console.log(user);
//     done(err, user);
//   });
// });



// passport.use(new LocalStrategy(function verify(user, password, cb) {
//   userDB.get('SELECT * FROM users WHERE username = ?', [user], function (err, row) {
//     if (err) { return cb(err); }
//     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
//   });
// }));

// passport.use(
//   new LocalStrategy(options, async function (
//     user,
//     password,
//     done
//   ) {
//     //const { id } = req.params
    
//     const userAuth = await userDB.findOne({ user: user }).select('-__v')
//     console.log(userAuth)
//     // if (books !== -1) {
//     //   console.log(id)
//     //   res.render("./books/view", {
//     //     title: "Books | view",
//     //     books: books,
//     //   })
//       console.log(`username: ` + user);
//       console.log(`password: ` + password);
//       console.log(`username: ` + userAuth.user);
//       console.log(`password: ` + userAuth.password);
//       if (user === userAuth.user && password === userAuth.password) {
//         return done(null, userAuth);
//       } else {
//         return done(null, false);
//       }
//     })
// );