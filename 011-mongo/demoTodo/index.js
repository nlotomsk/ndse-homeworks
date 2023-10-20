const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

require('dotenv').config();

const errorMiddleware = require('./middleware/error');
const todoApiRouter = require('./routes/api/todo');

//const UrlDB = process.env.UrlDB

const app = express();
app.use(express.json());

app.use('/api/todo', todoApiRouter);

app.use(errorMiddleware);

UrlDB = "mongodb://127.0.0.1:27017/admin"

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB, {

            dbName: "demo" // имя базы данных
            
            });
        app.listen(PORT)
        console.log("connect")
    } catch (e) {
        console.log(e);
    }
}



//const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000;
start(PORT,UrlDB);