const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb')
const dbConfig = require('./config/database.config')
const bodyParser = require('body-parser')

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

        const user      = await collection.findOne({ login: req.body.Login })
        const emeil     = await collection.findOne({ email: req.body.Email })

        console.log(user)
        console.log(emeil)
        
        if(user || email){
            res.send(`В базе есть пользователь с логином - ${req.body.Login} или с email - ${req.body.Email}`)


        }else{
            const result = await collection.insertOne(req.body)
            res.send(`Пользователь успешно создан!`)
        }
        //res.sendStatus(200)

    }catch(e) {
        console.log(e)
        res.send(`Ошибка при выполнении запроса!`)
        res.sendStatus(500)
        //res.send('Ошибка при выполнении запроса!')

    } finally {
        await client.close()
    }
}

start_mongoDB()

app.post('/NewUser', (req, res) => {
    NewUser(req, res)
})







