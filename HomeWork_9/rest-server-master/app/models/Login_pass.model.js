const mongoose = require('mongoose')

const Login_Pass_Shema = mongoose.Schema({
    Login: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Login_Pass', Login_Pass_Shema)