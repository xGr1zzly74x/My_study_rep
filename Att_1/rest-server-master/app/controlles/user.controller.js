const EventsWorld = require('../models/eventsWorld.model')

// Создание события
exports.create = (req, res) => {
    // Валидация данных
    if(!req.body.name) {
        return res.status(400).send({
            message: 'Наименование события не может быть пустым',
            success: false
        }) 
    }

    if(!req.body.description) {
        return res.status(400).send({
            message: 'Описание события не может быть пустым',
            success: false
        }) 
    }

    const eventWorld = new EventWorld({
        name: req.body.name,
        description: req.body.description
    })

    eventWorld.save()
    .then(data => {
        res.send(data)
    }).catch((error) => {
        res.status(500).send({
            message: `Данные не записались: ${error.message}`,
            success: false
        })
    })
}

// Получение всех событий
exports.findAll = (req, res) => {}

// Получение определенного события
exports.findOne = (req, res) => {}

// Обновление определенного события
exports.update = (req, res) => {}

// Удаление определенного события
exports.delete = (req, res) => {}