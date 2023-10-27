const express = require('express')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

require('dotenv').config();

const errorMiddleware = require('./middlewafe/404');

const authRouter = require('./routes/auth')
const booksApiRouter = require('./routes/books-api')
const booksRouter = require('./routes/books')
const homeRouter = require('./routes/index')

const app = express()
app.use(express.json())
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRouter);

app.use('/books', booksRouter);

app.use('/api/user/login/', authRouter)

app.use('/api/books', booksApiRouter)

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

start(PORT,UrlDB);