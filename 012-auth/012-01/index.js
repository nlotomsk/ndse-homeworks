const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const User = require('./model/user');


//const { v4: uuid }        = require('uuid')
//mongoose.Promise          = require('bluebird')
//const FileStore             = require('session-file-store')(session);
//const userDB              = require('./model/auth')


//const passportLocalMongoose = require("passport-local-mongoose");

require('dotenv').config();

const errorMiddleware = require('./middlewafe/404');

const authRouter = require('./routes/auth')
const booksApiRouter = require('./routes/books-api')
const booksRouter = require('./routes/books')
const homeRouter = require('./routes/index')
const loginRouter = require('./routes/auth')
const logoutRouter = require('./routes/logout')
const profileRouter = require('./routes/profile')

//----------
//Middleware
//----------
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//app.use(express.urlencoded({ extended: false }));

const urlDB = "mongodb://localhost:27018/books"

mongoose.connect(urlDB, {
    //dbName: "books",
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true,
})
    .then((res) => {
        console.log("connect");
    });


// const store = new MongoDBSession({
//     uri: urlDB,
//     collection: "mySessions",
// })

// app.use(session({ secret: 'SECRET'}));
app.use(session({
    secret: 'secret',
    // store: new FileStore(),
    // cookie: {
    //     path: '/',
    //     httpOnly: true,
    //     maxAge: 60 * 60 * 1000,
    // },
    resave: false,
    saveUninitialized: false,
    //store: store,
})
);

// const isAuth = (req, res, next) => {

//     if (req.session.isAuth) {
//         next();
//     } else {
//         res.redirect("/login");
//     }
// };

//---------
// Passport
//---------

//require('./config/passport_config')




passport.serializeUser(async (user, done) => {
    console.log(user.id);
    await done(null, user.id);
    console.log('SERiz ok');
});

passport.deserializeUser(async (id, done) => {
    console.log("ljhgopuig  " + id);
    try {
        const user = await User.findOne({ _id: id });
        console.log("123"+user.id);
        return done(null, user.id);
    } catch (err) {
        next(err);
    }
    //
    // await User.findById(id)
    // console.log('deseriz ok');
});

//--------------------------
//async (req,res) => {
// const { email, password } = req.body;

// const user = await User.findOne({ email });

// if (!user) {
//     return res.redirect("/login");
// }

// const isMatch = await bcrypt.compare( password, user.password );

// if (!isMatch) {
//     return res.redirect("/login");
// }

// req.session.isAuth = true;
// res.redirect("/api/user/me");
//-----------------------------
const options = {
    usernameField: "email",
    passwordField: "password",
}

passport.use(new LocalStrategy(options, async (email, password, done) => {
    let user = await User.findOne({ email: email });
    console.log(user);
    console.log(email);
    console.log(password + user.password);
    if (!email) {
        return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.redirect("/login");
    }

    return done(null, user);

}));

app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}));

//------------------------------
// passport.use(new LocalStrategy(async function (username, password, done) {
// 	const user =  User.findOne({ username: username }).orFail('Incorrect username.');

//         // function (user) {
// 		// // if (err) return done(err);
// 		// if (!user) return done(null, false);

// 		await bcrypt.compare(password, user.password, 

//             function (res)
//             {
//                 console.log('pass customs');
//                 console.log(res);
// 			// if (err) return done(err);
// 			 if (res === false) return done(null, false);

// 			return done(null, user);
// 		})
// 	})
// );


// const options = {
//     usernameField: "username",
//     passwordField: "password",
// }

// passport.use(new LocalStrategy(options, verify));

//Проверка авторизации для страниц
const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    //console.log(req.session.isAuth);
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

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalStrategy(User.authenticate()));

// passport.use(() => {console.log("test");}, User.createStrategy());

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


// app.get("/secret", function(req, res){
//     res.render("secret");
// });
app.get("/register", function (req, res) {
    res.render("auth/register");
});

//----------------------
// handeling user sign up
//-----------------------

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.redirect('/register');
    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new User({
        username,
        email,
        password: hashedPsw
    })

    await user.save();
    res.redirect('/login');
    // console.log(req.body.username);
    // console.log(req.body.password);
    // User.register(new User({user: user}), password, function(err, user){
    //     if(err){
    //         console.log(err);
    //         return res.render("register");
    //     }
    //     passport.authenticate("local")(req, res, function(){
    //         res.redirect("/secret");
    //     });
    // });
});

// app.post("/login", async (req,res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.redirect("/login");
//     }

//     const isMatch = await bcrypt.compare( password, user.password );

//     if (!isMatch) {
//         return res.redirect("/login");
//     }

//     req.session.isAuth = true;
//     res.redirect("/api/user/me", user);
// });



// const auth = passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   })

//app.use('/', homeRouter);
app.get('/', (req, res) => {
    // req.session.isAuth = true;
    //console.log(req.session);
    res.render('index', {
        title: 'Главная библиотека',
    })
});
app.use('/books', isLoggedIn, booksRouter);

app.get('/login', (req, res) => {
    const response = {
        title: "Login",
        error: req.query.error
    }

    res.render('auth/login', response);
});

app.post('/logout', (req, res, next) => {
	res.clearCookie('connect.sid');  // clear the cookie
    res.redirect('/');
});

// app.post('/logout', (req, res) => {
//     //req.logout();
    
// 	res.redirect('/');
//     // req.logout(function(err) {
//     //   if (err) { return next(err); }
//     //   return res.redirect('/');
//     // });
// })

////app.use('/api/user/me' , profileRouter)

app.get('/api/user/me', isLoggedIn, (req, res) => {
    //console.log(req);
    res.render('users/profile', {
        title: 'Профиль юзера',

        user: req.username

    })
    console.log(req.username);
});





// app.get('/', (req,res) => {
//     req.session.isAuth = true;
//     console.log(req.session);
//     res.render('./vieindex', {
//         title: 'Главная библиотека',
//     })
// });

//app.use('/login', loginRouter);

//app.use('/logout', logoutRouter)

//app.use('/api/user/login/', authRouter)

app.use('/api/books', booksApiRouter)

// // Setup our admin user
// app.get('/setup', async (req, res) => {
//     console.log("setup");
// 	const exists = await User.exists({ username: "admin" });

// 	if (exists) {
// 		res.redirect('/login');
// 		return;
// 	};

// 	bcrypt.genSalt(10, function (err, salt) {
// 		if (err) return next(err);
// 		bcrypt.hash("pass", salt, function (err, hash) {
// 			if (err) return next(err);

// 			const newAdmin = new User({
// 				username: "admin",
//                 //password: "admin",
// 				password: hash
// 			});
// 			newAdmin.save();

// 			res.redirect('/login');
// 		});
// 	});
// });

app.use(errorMiddleware);

// const UrlDB = process.env.UrlDB
//const PORT = process.env.PORT || 3000
//start(PORT, UrlDB);
app.listen(3000, console.log("Server Running on localhost:3000"));