const fields = ['input_value', 'select_EI_1', 'select_EI_2']

let num
let field
let result

document.getElementById("button_calc").addEventListener("click", (event) => {
        let error = 0
        
        fields.forEach((field) => {
            const element = document.querySelector(`#${field}`)
            //console.log(`${element.value}`)
            if (element){
                element.style.color = "black"

                const er_lab = document.querySelector(`#er_lab${field}`)
                if (er_lab){
                    er_lab.remove()
                }
                
                if (validateFields(field, element) == false) {
                    error++
                }
            }   
        })
        //console.log(`${error}`)

        field = document.querySelector("#result")
        field.value = "Результат: "

        if (field){
            // Если ошибок нет, то выполним расчет
            if (error == 0) {
                const select_EI_1 = document.querySelector("#select_EI_1")
                const select_EI_2 = document.querySelector("#select_EI_2")

                if (select_EI_1 && select_EI_2){
                    if (select_EI_1.value == select_EI_2.value){
                        alert("Выберите разные ЕИ!")
                    }
                    else{
                        if (select_EI_1.value == "Цельсии"){
                            result = (num * 9/5) + 32
                        }
                        else{
                            result = (num -32) * 5/9
                        }
                    field.value = `${field.value}` + `${result.toFixed(5)}`
                    field.style.display = "block"
                    }
                }
            }
            else{
                field.style.display = "none"
            }
        }
    })

    //Вспомогательные функции
    function validateFields(name, inp) {
        // Проверить на число
        const parent = inp.parentNode
        
        if (name == "input_value") {
            num = Number(inp.value)
            if (isNumber(num) == false   || inp.value.trim() === ""){
                inp.style.color = "red"
                const error_label = document.createElement('label')
                error_label.setAttribute("id", `er_lab${name}`);
                error_label.textContent = "Введите действительное значение!"
                error_label.classList.add('error-label')
                parent.append(error_label)
                return false
            }
        }
        // Остальные поля проверить на пустоту
        else{
            if (inp.value.trim() === ""){
                inp.style.color = "red"
                const error_label = document.createElement('label')
                error_label.setAttribute("id", `er_lab${name}`);
                error_label.textContent = "Укажите ЕИ!"
                error_label.classList.add('error-label')
                parent.append(error_label)
                return false
            }
        }
    }

    //Вспомогательные функции
    function isNumber(val) {
        return (val instanceof Number||typeof val === 'number') && !isNaN(val)
    }
