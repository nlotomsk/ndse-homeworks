const express = require('express')
const router = express.Router()
const { stor, Books } = require('../lib/lib')
const fileMulter = require('../middlewafe/file')

router.get('/', (req, res) => {
    const { books } = stor
    res.render('books/index', {
        title: 'Books',
        books: books,
    })
})

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Books | create',
        books: {},
    })
});

router.post('/create', (req, res) => {
        const { books } = stor
        const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
        const newBooks = new Books(title, description, authors, favorite, fileCover, fileName, fileBook)
        //newBooks.fileBook = req.file.path
        //newBooks.fileName = req.file.filename
        books.push(newBooks)
        //res.status(201)
        //res.json(newBooks)
        fileID = newBooks.id
        res.redirect('/books')
    })

router.get('/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
        //res.json(books[idx])
    }
        res.render("books/view", {
            title: "Books | view",
            books: books[idx],
        })
})


router.get('/update/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    }

    res.render("books/update", {
        title: "books | update",
        books: books[idx],
    })
});


router.post('/update/:id', (req, res) => {
    const { books } = stor
    const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
        
        }
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
    res.redirect(`/books`)
})

router.post('/delete/:id', (req, res) => {
    const { books } = stor
    const { id } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404')
    } 
    books.splice(idx, 1)
    res.redirect('/books')
})

module.exports = router