const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная библиотека',
    })
});

// router.post('/login', (req, res, next) => {
//     //console.log(req);
//     //console.log("req.user: ", req.body.username)
//     passport.authenticate('local', function (err, user) {

//         //console.log(res);
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

// router.post('/logout', (req,res, next) => {
//     console.log("Вышел");
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// })

module.exports = router;