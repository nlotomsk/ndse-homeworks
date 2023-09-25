const express = require('express')
const { v4: uuid } = require('uuid')
//const stor = require('./lib/lib')

const authRouter = require('./routes/auth')
const booksRouter = require('./routes/books')

class Books {
    constructor(title = "", description = "", authors = "", favorite = false, fileCover = "", fileName = "", fileBook = "",id = uuid()) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.id = id
    }
}

const stor = {
     books:[],
}

const app = express()
app.use(express.json())

app.use('/api/user/login/', authRouter)

app.use('/api/books', booksRouter)

app.get('/api/books/:id', (req,res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.post('/api/books', (req,res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBooks = new Books(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBooks)
    res.status(201)
    res.json(newBooks)
})
app.put('/api/books/:id', (req,res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        }
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})
app.delete('/api/books/:id', (req,res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        
        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT)