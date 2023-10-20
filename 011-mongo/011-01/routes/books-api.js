const express = require('express')
const router = express.Router()


const Books = require('../model/books')

router.get('/', async (req, res) => {
    try {
        const books = await Books.find().select('-__v')
        res.json(books)
        console.log(books)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/',
    async (req, res) => {
        const { title, description, authors, favorite, fileCover, fileName } = req.body
        const newBooks = new Books({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        })
        try {
            await newBooks.save()
            res.json(newBooks)
        } catch (e) {
            res.status(500).json(e)
        }
    })

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const books = await Books.findById(id).select('-__v')
        if (books !== null) {
            res.json(books)
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

router.put('/:id', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const { id } = req.params
    const books = await Books.findById(id).select('-__v')
    console.log(books)
    if (books !== null) {
        try {
            await Books.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
            const booksPut = await Books.findById(id).select('-__v')
            console.log(booksPut)
            res.json(booksPut)
        } catch (e) {
            res.status(500).json(e)
        }

    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Books.deleteOne({ _id: id })
        res.json("ok")
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router