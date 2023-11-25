onmessage = async (e) => { 
    try {
        const response = await fetch("http://localhost:4040/History_Query_City", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        })
        if (!response.ok) {
            postMessage(`Нет ответа от сервера MongoDB, история запроса не сохранена!`)

        } else {
            postMessage(`История запроса успешно сохранена!`)
        }
    } catch (error) {
        postMessage(`Нет ответа от сервера MongoDB, история запроса не сохранена!`)
    }
}