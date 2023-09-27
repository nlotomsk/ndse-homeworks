const express = require('express')
const router = express.Router()
const { stor, Books } = require('../lib/lib')
const fileMulter = require('../middlewafe/file')

router.get('/', (req, res) => {
    console.log('books get')
    const { books } = stor
    res.json(books)
    // res.render('books/index', {
    //     title: 'Books',
    //     books: books,
    // })
})

router.post('/',
    fileMulter.single('fileBook'),
    (req, res) => {
        const { books } = stor
        const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
        const newBooks = new Books(title, description, authors, favorite, fileCover, fileName)
        newBooks.fileBook = req.file.path
        newBooks.fileName = req.file.filename
        books.push(newBooks)
        res.status(201)
        res.json(newBooks)
        fileID = newBooks.id
    })

router.get('/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.get('/:id/download', (req, res) => {
    console.log('books get:id')
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        res.download(__dirname+`/../${books[idx].fileBook}`, `${books[idx].fileName}`);
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.put('/:id', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const { id } = req.params
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

router.delete('/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {

        books.splice(idx, 1)
        res.json('ok')
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

module.exports = router