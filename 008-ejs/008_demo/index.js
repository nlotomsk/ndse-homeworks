const express = require('express');

const errorMiddleware = require('./middleware/404');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/todo', todoRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
