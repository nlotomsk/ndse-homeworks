const express = require('express')
const { v4: uuid } = require('uuid')
const { stor, Books } = require('./lib/lib')

const authRouter = require('./routes/auth')
const booksApiRouter = require('./routes/books-api')
const booksRouter = require('./routes/books')
const homeRouter = require('./routes/index')

const app = express()
app.use(express.json())
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', homeRouter);

app.use('/books', booksRouter);

app.use('/api/user/login/', authRouter)

app.use('/api/books', booksApiRouter)

//app.use(errorMiddleware);

module.exports = stor

const PORT = process.env.PORT || 3000
app.listen(PORT)