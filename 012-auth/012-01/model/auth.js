const {Schema, model} = require('mongoose')

const authSchema = new Schema({
    usernameField: {
        type: String,
        required: true,
    },
    passwordField: {
        type: String,
        required: true,
    }
})

module.exports = model('Auth', authSchema)