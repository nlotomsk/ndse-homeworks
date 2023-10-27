const express = require('express')
const router = express.Router()
//const { stor, Books } = require('../lib/lib')
const fileMulter = require('../middlewafe/file')

const Books = require('../model/books')
///загрузкка всех книг из базы
router.get('/', async (req, res) => {
    try {
        const books = await Books.find().select('-__v')
        //res.json(books)
        //console.log(books)
        res.render('books/index', {
            title: 'Books',
            books: books,
        })
    } catch (e) {
        res.status(500).json(e)
    }
})

// router.get('/', (req, res) => {
//     const { books } = stor
//     res.render('books/index', {
//         title: 'Books',
//         books: books,
//     })
// })
/////Форма дл добавления книги
router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Books | create',
        books: {},
    })
});

// router.post('/create', (req, res) => {
//         const { books } = stor
//         const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
//         const newBooks = new Books(title, description, authors, favorite, fileCover, fileName, fileBook)
//         //newBooks.fileBook = req.file.path
//         //newBooks.fileName = req.file.filename
//         books.push(newBooks)
//         //res.status(201)
//         //res.json(newBooks)
//         fileID = newBooks.id
//         res.redirect('/books')
//     })
/////Добавить книгу
router.post('/create',
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
            res.redirect('/books')
            //res.json(newBooks)
        } catch (e) {
            res.status(500).json(e)
        }
    })


// router.get('/:id', (req, res) => {
//     const { books } = stor
//     const { id } = req.params
//     const idx = books.findIndex(el => el.id === id)

//     if (idx === -1) {
//         res.redirect('/404')
//         //res.json(books[idx])
//     }
//         res.render("books/view", {
//             title: "Books | view",
//             books: books[idx],
//         })
// })
///////Просмотр книги
router.get('/:id', async (req, res) => {
    
    try {
        const { id } = req.params
        console.log(id)
        const books = await Books.findById(id).select('-__v')
        if (books !== -1) {
            console.log(id)
            res.render("./books/view", {
                title: "Books | view",
                books: books,
            })
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//////Обновление записи о книге(плучить на редактирование)
// router.get('/update/:id', (req, res) => {
//     const { books } = stor
//     const { id } = req.params
//     const idx = books.findIndex(el => el.id === id)

//     if (idx === -1) {
//         res.redirect('/404')
//     }

//     res.render("books/update", {
//         title: "books | update",
//         books: books[idx],
//     })
// });

router.get('/update/:id', async (req, res) => {
    
    try {
        const { id } = req.params
        console.log(id)
        const books = await Books.findById(id).select('-__v')
        if (books !== -1) {
            console.log(id)
            res.render("./books/update", {
                title: "Books | update",
                books: books,
            })
        } else {
            res.status(404)
            res.json('404 | страница не найдена')
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//////Обновление записи о книге(запись новых данных)
// router.post('/update/:id', (req, res) => {
//     const { books } = stor
//     const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
//     const { id } = req.params
//     const idx = books.findIndex(el => el.id === id)

//     if (idx === -1) {
//         res.redirect('/404')

//     }
//     books[idx] = {
//         ...books[idx],
//         title,
//         description,
//         authors,
//         favorite,
//         fileCover,
//         fileName,
//         fileBook
//     }
//     res.redirect(`/books`)
// })

router.post('/update/:id', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body
    const { id } = req.params
    const books = await Books.findById(id).select('-__v')
    console.log('test ${books}')
    if (books !== null) {
        try {
            await Books.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
            const booksPut = await Books.findById(id).select('-__v')
            console.log(booksPut)
            //res.json(booksPut)
            res.redirect(`/books`)
        } catch (e) {
            res.status(500).json(e)
        }

    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

//////Удаление записи о книге

// router.post('/delete/:id', (req, res) => {
//     const { books } = stor
//     const { id } = req.params
//     const idx = books.findIndex(el => el.id === id)

//     if (idx === -1) {
//         res.redirect('/404')
//     }
//     books.splice(idx, 1)
//     res.redirect('/books')
// })

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    //console.log("id")
    try {
        await Books.deleteOne({ _id: id })
        //res.json("ok")
        res.redirect('/books')
        //console.log("ok")
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router