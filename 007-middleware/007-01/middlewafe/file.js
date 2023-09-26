const multer = require('multer')
//const fileID = require('../routes/books')

const storage = multer.diskStorage({
    destination(req, file, cb) {

        cb(null, 'public/lib')
    },
    filename(req, file, cb) {
        //console.log(req.body)
        //console.log(fileID)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = multer({ storage })