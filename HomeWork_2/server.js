//Адрес WEB-сервера http://localhost:4040/
//Запуск сервера по команде node ./serever/js
//Остановка серевера по команде CTRL + C
//Модули express и path ставить через npm i
const express = require('express')
const app = express()
const path = require('path')

app.get('/',(request, response) => {
    response.send({message: 'Наш сервис'})

})

app.use(express.static("public"));

//Одать страницу на сервер по ссылке /main 
app.get('/main',(request, response) => {
    response.sendFile(path.join(__dirname + '/public/index.html'))

})

const port = 4040
app.listen(port, ()=>{
    console.log(`App start on port: ${port}`)
})