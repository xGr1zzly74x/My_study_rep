module.export = (app) => {
    const eventsWorld = require('../controlles/eventsWorld.controller')

    // Создание события
    app.post('/event', eventsWorld.create)

    // Получить все события
    app.get('/events', eventsWorld.findAll)

    // Получить определнное событие
    app.get('/event/:id', eventsWorld.findOne)

    // Обновить информацию о событии
    app.put('/event/:id', eventsWorld.update)

    // Удалить событие
    app.delete('/event/:id', eventsWorld.delete)
}