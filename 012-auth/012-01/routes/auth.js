const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('auth/login')
})

// router.post('auth/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   (req, res) => {
//     console.log("req.user: ", req.user)
//     res.redirect('/')
//   })

module.exports = router