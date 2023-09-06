const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

// app.use(bodyParser.urlencoded({ extended: true}))

// app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Успешное подключение к базе данных')
}).catch((error) => {
    console.log('Нет соединения с базой данных. Все плохо....', error)
    process.exit()
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
    response.send({message: 'Наш сервис'})
})

app.get('/login', (request, response) => {
    // console.log('request=====', request)
    //console.log('request.!!!!query=====', request.query)

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    response.sendFile(`${__dirname}/public/index.html`)
})

app.post('/api/login', (request, response) => {

    console.log('request.body=====', request.body,)

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    // response.sendFile(`${__dirname}/public/index.html`)
})

app.get('/main', (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`)
})

app.get('/articles', (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`)
})

app.get('/articles/article/:id', (request, response) => {
    //запрос к базе id
    response.sendFile(`${__dirname}/public/index.html`)
})

app.post('/articles/article/', (request, response) => {
    console.log('request===============', request)
    request 
    response.send({message: 'Наш сервис POSt'})
})

app.put('/articles/article/', (request, response) => {
    request 
    response.send({message: 'Наш сервис'})
})

app.delete('/articles/article/:id', (request, response) => {
    request 
    console.log('dsfdsfs')
    response.status(200)
    if(id) {
        // удаляя ем

    } else {
        response.send({message: 'Нет ID'})
    }  
})



//localhost:4040/articles/article/213123123213


const PORT = 4040

app.listen(PORT, () => {
    console.log(`Application start on port: ${PORT}`)
})