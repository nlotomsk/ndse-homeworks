const express = require('express')
//const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
//mongoose.Promise = require('bluebird')
bodyParser = require("body-parser")

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FileStore = require('session-file-store')(session);
//const userDB = require('./model/auth')
// requires the model with Passport-Local Mongoose plugged in
const User = require('./model/user');
const passportLocalMongoose = require("passport-local-mongoose");

require('dotenv').config();

const errorMiddleware = require('./middlewafe/404');

const authRouter = require('./routes/auth')
const booksApiRouter = require('./routes/books-api')
const booksRouter = require('./routes/books')
const homeRouter = require('./routes/index')
const loginRouter = require('./routes/auth')
const logoutRouter = require('./routes/logout')
const profileRouter = require('./routes/profile')




const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// app.use(session({ secret: 'SECRET'}));
app.use(
    session({
        secret: 'hghtyNN23h',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
    })
);

//require('./config/passport_config')

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport.use(userDB.createStrategy());

// passport.serializeUser(userDB.serializeUser());
// passport.deserializeUser(userDB.deserializeUser());
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
// app.get('/', (req,res) => {
//     console.log('Пошел на форму авторизации');
//     res.render('auth/login', {
//         title: 'Login'
//     })
// })
// app.post("/login", passport.authenticate('local'),
// // ,{
    
// //     successRedirect: "/secret",
// //     failureRedirect: "/login"
// // })
// function(req, res){
//     res.statusCode = 200;
// //   //res.setHeader('Content-Type', 'application/json');
// //   res.json({success: true, status: 'You are successfully logged in!'});
// });
// app.post('/login', (req, res, next) => {
//     //console.log(req);
//     console.log("req.user: ", req.body.user)
//     //const user = req.body.username
//     passport.authenticate('local', function (err, user) {

//         console.log(user);
//         //console.log(err);
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return res.send('Укажите правильный email или пароль!');
//         }
//         req.logIn(user, function (err) {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/');
//         });
//     })(req, res, next);
// });
//Проверка авторизации для страниц
const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Авторизован");
        next();
    } else {
        console.log("Не авторизован");
        return res.redirect('/login'
        // , {
        //     title: 'login'
        // }
        );
    }
};
app.get("/secret", auth, function(req, res){
    res.render("secret");
});
app.get("/register", function(req, res){
    res.render("register");
});
// handeling user sign up
app.post("/register", function(req, res){
    // console.log(req.body.username);
    // console.log(req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});



// const auth = passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })

app.use('/', homeRouter);

app.use('/books', auth,  booksRouter);

app.use('/login', loginRouter);

//app.use('/logout', logoutRouter)

app.get('/logout', (req,res, next) => {
    console.log("Вышел");
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
    });
})

app.use('/api/user/me', auth, profileRouter)
// router.post('/logout', function(req, res, next) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   });

app.use('/api/user/login/', authRouter)

app.use('/api/books',auth, booksApiRouter)

app.use(errorMiddleware);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB, {
            dbName: "books"
        });
        app.listen(PORT)
        console.log("connect")
    } catch (e) {
        console.log(e);
    }
}

const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000

start(PORT, UrlDB);