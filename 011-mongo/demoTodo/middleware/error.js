module.exports = ((req, res) => {
    res.render('../views/errors/index.ejs', {
        title: '404'
    })
})