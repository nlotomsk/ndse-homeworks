const { v4: uuid } = require('uuid')

class Books {
    constructor(title = "", description = "", authors = "", favorite = false, fileCover = "", fileName = "", fileBook = "", id = uuid()) {
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
    books: [],
};

[1, 2, 3].map(el => {
    const newBooks = new Books(`title ${el}`, `description = ${el}`, `authors ${el}`, ``,`fileCover ${el}`, `fileName ${el}`, `fileBook ${el}`);
    stor.books.push(newBooks);
});

module.exports = { stor, Books }