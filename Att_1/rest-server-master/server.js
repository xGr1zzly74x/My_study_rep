const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config')
const bodyParser = require('body-parser')
const Login_Pass = require('./app/models/Login_pass.model')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4040

async function start_mongoDB() {
    try {
        await mongoose.connect(dbConfig.url, {
            useNewUrlParser: true
        })
        console.log('Успешное подключение к базе данных')
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту: ${PORT}`)
        })

    } catch (e) {
        console.log('Нет соединения с базой данных. Все плохо....', e)
        process.exit()
    }
}

start_mongoDB()

app.post('/Login', (req, res) => {

    const Login = req.body.Login
    const Password = req.body.Password
    const Email = req.body.Email

    const send_base = new Login_Pass({ Login: Login, Password: Password, Email: Email })

    output = send_base.save()
    console.log(send_base)
    res.sendStatus(201)
            // if (er) {
            //     console.log(er)
            //     res.sendStatus(500)

            // } else {
            //     console.log(`Новый аккаунт создан в базе!`)
            //     send_base.speak()
            //     res.sendStatus(201)
            // }

})





