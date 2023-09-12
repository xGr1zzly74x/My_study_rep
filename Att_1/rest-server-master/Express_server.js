const express           = require('express')
const path              = require('path')
const cors              = require('cors')
const mongoose          = require('mongoose')
const { MongoClient }   = require('mongodb')
const dbConfig          = require('./config/database.config')
const bodyParser        = require('body-parser')

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

async function NewUser(req, res) {
    const client = new MongoClient(dbConfig.url)

    try {
        await client.connect()
        const database = client.db("Auth")
        const collection = database.collection("LogPass")

        const check_user = await collection.findOne({ "Login": req.body.Login, "Email": req.body.Email })

        if (check_user) {
            const resp_user = { Login: check_user.Login, Password: check_user.Password, Email: check_user.Email, _id: check_user._id, New: ``, Exist: `X`}
            res.status(200).send(resp_user)
            console.log(`В базе есть пользователь с логином - ${check_user.Login} и/или с email - ${check_user.Email}`)

        } else {
            const new_user = await collection.insertOne(req.body)
            const resp_user = { Login: req.body.Login, Password: req.body.Password, Email: req.body.Email, _id: new_user.insertedId, New: `X`, Exist: ``}
            res.status(200).send(resp_user)
            console.log(`Пользователь успешно создан! Логин: ${req.body.Login} Пароль: ${req.body.Password} Email: ${req.body.Email}`)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(`Ошибка при выполнении запроса!`)

    } finally {
        await client.close()
    }
}

//В GET запросе почему то объекты хранятся с маленькой буквы, хотя в запрос передавали с большой?!
async function CheckUser(req, res) {
    const client = new MongoClient(dbConfig.url)

    try {
        await client.connect()
        const database = client.db("Auth")
        const collection = database.collection("LogPass")

        const check_user = await collection.findOne({ "Login": req.headers.login, "Password": req.headers.password })
        const null_user = { Login: 'none', Password: 'none', Email: 'none', _id: 'none'}

        if (check_user) {
            res.status(200).send(check_user)
            console.log(`Успешная авторизация! Логин: ${check_user.Login} Пароль: ${check_user.Password}`)

        } else {
            res.status(200).send(null_user)
            console.log(`Учетная запись логин: ${req.headers.login} пароль: ${req.headers.password} не найдена!`)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(`Ошибка при выполнении запроса!`)

    } finally {
        await client.close()
    }
}

start_mongoDB()

app.post('/NewUser', (req, res) => {
    NewUser(req, res)
})

app.get('/CheckUser', (req, res) => {
    CheckUser(req, res)
})







