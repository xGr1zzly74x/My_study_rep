const express           = require('express')
const path              = require('path')
const cors              = require('cors')
const mongoose          = require('mongoose')
const {MongoClient}     = require('mongodb')
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

        const check_user  = await collection.findOne({ "Login": req.body.Login, "Email": req.body.Email })
        
        if(check_user){
            res.status(200).send(`В базе есть пользователь с логином - ${req.body.Login} и/или с email - ${req.body.Email}`)
            console.log(`В базе есть пользователь с логином - ${req.body.Login} и/или с email - ${req.body.Email}`)

        }else{
            const result = await collection.insertOne(req.body)
            res.status(200).send(`Пользователь успешно создан! Логин: ${req.body.Login} Пароль: ${req.body.Password} Email: ${req.body.Email}`)
            console.log(`Пользователь успешно создан! Логин: ${req.body.Login} Пароль: ${req.body.Password} Email: ${req.body.Email}`)
        } 
        

    }catch(e) {
        console.log(e)
        res.status(500).send(`Ошибка при выполнении запроса!`)

    } finally {
        await client.close()
    }
}

async function CheckUser(req, res) {
    const client = new MongoClient(dbConfig.url)  

    try {
        await client.connect()
        const database = client.db("Auth")
        const collection = database.collection("LogPass")

        const check_user  = await collection.findOne({ "Login": req.body.Login, "Password": req.body.Password })
        
        if(check_user){
            res.status(200).send(`Успешная авторизация! Логин: ${req.body.Login} Пароль: ${req.body.Password}`)
            console.log(`Успешная авторизация! Логин: ${req.body.Login} Пароль: ${req.body.Password}`)

        }else{
            res.status(200).send(`Учетная запись логин: ${req.body.Login} пароль: ${req.body.Password} не найдена!`)
            console.log(`Учетная запись логин: ${req.body.Login} пароль: ${req.body.Password} не найдена!`)
        }
        

    }catch(e) {
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

app.post('/CheckUser', (req, res) => {
    CheckUser(req, res)
})







