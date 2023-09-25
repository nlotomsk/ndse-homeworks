const express = require('express')
//import {stor} from '../index'
const router = express.Router()
//const books = require('../index')

//console.log(books)

router.get('/', (req,res) => {
    console.log('stor')
    //const books = stor
    res.json(books)
})

module.exports = router