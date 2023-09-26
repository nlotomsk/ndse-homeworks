const express = require('express')
const { v4: uuid } = require('uuid')
const { stor, Books } = require('./lib/lib')

const authRouter = require('./routes/auth')
const booksRouter = require('./routes/books')

const app = express()
app.use(express.json())

app.use('/api/user/login/', authRouter)

app.use('/api/books', booksRouter)

module.exports = stor

const PORT = process.env.PORT || 3000
app.listen(PORT)