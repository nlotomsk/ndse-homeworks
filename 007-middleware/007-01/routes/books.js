const express = require('express')
//import { stor } from '../index'
//const { stor } = require('../index')
const router = express.Router()
const { stor, Books } = require('../lib/lib')
const fileMulter = require('../middlewafe/file')


//console.log(books)

router.get('/', (req, res) => {
    console.log('books get')
    const { books } = stor
    res.json(books)
})

router.post('/',
    fileMulter.single('fileBook'),
    (req, res) => {
        //console.log('books post')
        //console.log(req)
        const { books } = stor
        const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
        const newBooks = new Books(title, description, authors, favorite, fileCover, fileName)
        newBooks.fileBook = req.file.path
        newBooks.fileName = req.file.filename
        books.push(newBooks)
        res.status(201)
        res.json(newBooks)
        fileID = newBooks.id

        // const storage = multer.diskStorage({
        //     destination(req, file, cb) {
        //         cb(null, 'public/lib')
        //     },
        //     filename(req, file, cb) {
        //         cb(null, `${Date.now()}-${newBooks.id}`)
        //     }
        // })

        // if (req, res) {
        //     const { path } = req.file
        //     res.json
        // }

    })

router.get('/:id', (req, res) => {
    console.log('books get:id')
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
//module.exports = fileID