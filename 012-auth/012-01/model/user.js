const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// const authSchema = new mongoose.Schema({
//     user: {
//                 type: String,
//                 required: true,
//             },
//             password: {
//                 type: String,
//                 required: true,
//             }
// });

// //authSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('Auth', authSchema);

//---------------------------------------------
// const {Schema, model} = require('mongoose')

// const authSchema = new Schema({
//     user: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// })

// module.exports = model('Auth', authSchema)