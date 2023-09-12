import React, { useEffect, useState, useContext, useRef } from 'react'
import { InputText } from '../../components'
import './styles.css'
/* Action в Form делает fetch запрос в адресу указанному после =*/

const Login = () => {

    const regex_pas   = new RegExp('^[a-z]+$')
    const regex_log   = new RegExp('^[a-zA-Z0-9]+$')
    const regex_email = new RegExp('@')

    //Подключаем хук состояния, эффекта
    const [isSign, setSign] = useState<boolean>(false)//Для переключения слайдера

    const [userName_sign, setUserName_sign] = useState<string>('')//Имя пользователя
    const [userName_new, setUserName_new] = useState<string>('')//Имя пользователя
    const [userPass_sign, setUserPass_sign] = useState<string>('')//Пароль(вход)
    const [userPass_new1, setUserPass_new1] = useState<string>('')//Пароль_1(регистрация)
    const [userPass_new2, setUserPass_new2] = useState<string>('')//Пароль_2(регистрация)
    const [email, setemail] = useState<string>('')//Email
    const [mes, setmes] = useState<any>('')//Сообщение

    const [isPassOther, setPassOther] = useState<boolean>(false)//Для определения ошибки в случае несовпадения паролей (регистрация)
    const [isPassError_sign, setPassError_sign] = useState<boolean>(false)//Для валидации пароля  (вход)
    const [isPassError1, setPassError1] = useState<boolean>(false)//Для валидации пароля1 (регистрация)
    const [isPassError2, setPassError2] = useState<boolean>(false)//Для валидации пароля2 (регистрация)
    const [isLogError, setLogError] = useState<boolean>(false)//Для валидации логина
    const [isEmailError, setemailError] = useState<boolean>(false)//Для валидации email

    const [isButDisNewUser, setButDisNewUser] = useState<boolean>(false)//Для отображения кнопки регистрация
    const [isButDisCheckUser, setButDisCheckUser] = useState<boolean>(false)//Для отображения кнопки вход

    //при нажатии переключить слайдер записав в перменную isSign противопложное значение
    const handleClickSign = () => {
        setSign(!isSign)
    }

    //При изменении пароля_1 записать значение в переменную userPass1
    const handleChangePass_new_1 = (event: any) => {
        //Меняем состояние переменной setUserPass1
        setUserPass_new1(event.target.value)

        if (!event.target.value) {
            setPassError1(false)
        }
        else {
            if (regex_pas.test(event.target.value)) {
                setPassError1(false)
            }
            else {
                setPassError1(true)
            }
        }
    }

    //При изменении пароля_2 записать значение в переменную userPass2
    const handleChangePass_new_2 = (event: any) => {
        //Меняем состояние переменной setUserPass2
        setUserPass_new2(event.target.value)

        if (!event.target.value) {
            setPassError2(false)
        }
        else {
            if (regex_pas.test(event.target.value)) {
                setPassError2(false)
            }
            else {
                setPassError2(true)
            }
        }
    }

    //При изменении пароля(вход) записать значение в переменную userPass_sign
    const handleChangePass_sign = (event: any) => {
        //Меняем состояние переменной setUserPass2
        setUserPass_sign(event.target.value)

        if (!event.target.value) {
            setPassError_sign(false)
        }
        else {
            if (regex_pas.test(event.target.value)) {
                setPassError_sign(false)
            }
            else {
                setPassError_sign(true)
            }
        }
    }
    //При изменении логина(регистрация) записать значение в переменную userName_new
    const handleChangeLogin_new = (event: any) => {
        const user = event.target.value
        setUserName_new(user)

        if (!user) {
            setLogError(false)
        }
        else {
            if (regex_log.test(user)) {
                setLogError(false)
            }
            else {
                setLogError(true)
            }
        }
    }
    //При изменении логина(вход) записать значение в переменную userName_sign
    const handleChangeLogin_sign = (event: any) => {
        const user = event.target.value
        setUserName_sign(user)

        if (!user) {
            setLogError(false)
        }
        else {
            if (regex_log.test(user)) {
                setLogError(false)
            }
            else {
                setLogError(true)
            }
        }
    }
    //При изменении email записать значение в переменную email
    const handleChangeEmail = (event: any) => {
        setemail(event.target.value)

        if (!event.target.value) {
            setemailError(false)

            console.log(regex_email.test(event.target.value))
        }
        else {
            if (regex_email.test(event.target.value)) {
                setemailError(false)
                console.log(regex_email.test(event.target.value))
            }
            else {
                setemailError(true)
                console.log(regex_email.test(event.target.value))
            }
        }
    }

    //Эффект будет вызывать каждый раз при рендере компонента (если указать ,[] то вызов будет только при 1 рендере).
    //Можно запускать эффект в зависимости от переменных в []
    //Вызовем эффект для проверки паролей
    //Проверку на совпадение можно также сделать записав if else в handleChangePass1 и handleChangePass2, тогда useEffect не нужен, но так короче!
    useEffect(() => {
        document.body.classList.add('body_login')
        document.body.classList.remove('body_about')
        document.body.classList.remove('body_catalog_places')

        if (mes) {
            alert(mes)
            setmes('')
        }

        if (userPass_new1 !== userPass_new2) {
            setPassOther(true)

        } else {
            setPassOther(false)
        }

        //Отображение кнопки регистрации
        if (!userPass_new1 || !userPass_new2 || !email || !userName_new ||
            isPassOther || isPassError1 || isPassError2 || isLogError || isEmailError) {
            setButDisNewUser(false)
        }

        else {
            setButDisNewUser(true)
        }

        //Отображение кнопки входа
        if (!userPass_sign || !userName_sign || isPassError_sign || isLogError) {
            setButDisCheckUser(false)
        }

        else {
            setButDisCheckUser(true)
        }
    })

    //Добавить нового пользователя POST запросом
    //Объекты добавить в BODY
    const handleClickNewUser = async (event:any) => {
        const body: { Login: string, Password: string, Email: string } = { Login: userName_new, Password: userPass_new1, Email: email}
        let text
        //Убираем отправку формы действие по умолчанию - перезагрузку страницы и выполняем только наш код ниже
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:4040/NewUser", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            if (!response.ok) {
                text = `Неудачный запрос к базе данных!`

            } else {
                //получить JSON объект
                const resp_json = await response.json()
                if (resp_json.New === `X`){
                    text = `Пользователь успешно создан! Логин: ${resp_json.Login} Пароль: ${resp_json.Password} Email: ${resp_json.Email}`
                
                }else{
                    text = `В базе есть пользователь логин: ${resp_json.Login} и/или email: ${resp_json.Email}`
                }
                
            }
        }
        catch (e) {
            text = 'Нет ответа от сервера базы данных!'
        }
        setmes(text)
    }

    //Проверить логин + пароль пользователя GET запросом
    //Объекты добавить в HEADERS
    const handleClickCheckUser = async (event:any) => {
        const headers: { Login: string, Password: string } = { Login: userName_sign, Password: userPass_sign}
        let text
        //Убираем отправку формы действие по умолчанию - перезагрузку страницы и выполняем только наш код ниже
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:4040/CheckUser", {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Login': headers.Login,
                    'Password': headers.Password,
                },
            })

            if (!response.ok) {
                 text = `Неудачный запрос к базе данных!`

            } else {
                //получить JSON объект
                const resp_json = await response.json()
                text = `Успешная авторизация! Логин: ${resp_json.Login} Пароль: ${resp_json.Password}`
            }
        }
        catch (e) {
            text = 'Нет ответа от сервера базы данных!' 
        }
        setmes(text)
    }

    const handleClickGetData = () => {
        window.location.href = 'http://localhost:3000/CatalogPlaces'
    }

    const handleClickAbout = () => {
        window.location.href = 'http://localhost:3000/About' 
    }

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container'

    return (
        <>
            <button onClick={handleClickGetData}>Запрос данных о загрязнении</button>
            <button onClick={handleClickAbout}>О сервисе</button>

            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Создайте пользователя</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span> */}

                        <InputText type="text"
                            className="InputText"
                            placeholder="Введите логин"
                            onChange={(event: any) => handleChangeLogin_new(event)} />
                        {isLogError && <div style={{ color: 'red' }}>Недопустимые символы в логине!</div>}

                        <InputText type="text"
                            className="InputText"
                            placeholder="Введите Email"
                            onChange={(event: any) => handleChangeEmail(event)} />
                        {isEmailError && <div style={{ color: 'red' }}>Недопустимые символы в email!</div>}

                        <InputText
                            type="password"
                            className="InputText"
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass_new_1(event)} />
                        {isPassError1 && <div style={{ color: 'red' }}>Недопустимые символы в пароле!</div>}

                        <InputText
                            className="InputText"
                            type="password"
                            placeholder="Введите пароль повторно"
                            onChange={(event: any) => handleChangePass_new_2(event)} />
                        {isPassError2 && <div style={{ color: 'red' }}>Недопустимые символы в пароле!</div>}

                        {isPassOther && <div style={{ color: 'red' }}>Пароли не совпадают</div>}
                        {isButDisNewUser && <button onClick={handleClickNewUser}>Регистрация</button>}
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form>
                        <h1>Войдите в свою учетную запись</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}

                        {/* <span>or use your account</span> */}
                        <InputText
                            className="InputText"
                            type="text"
                            placeholder="Введите логин"
                            onChange={(event: any) => handleChangeLogin_sign(event)}

                        />
                        {isEmailError && <div style={{ color: 'red' }}>Недопустимые символы в email!</div>}

                        <InputText type="password"
                            className="InputText"
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass_sign(event)} />
                        {isPassError_sign && <div style={{ color: 'red' }}>Недопустимые символы в пароле!</div>}
                        <a href="#">Забыли пароль</a>
                        {isButDisCheckUser && <button onClick={handleClickCheckUser}>Вход</button>}
                    </form>
                </div>

                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Войти в учетную запись</h1>
                            <p>Для продолжения выполните вход в вашу учетную запись</p>
                            <button onClick={handleClickSign} className="ghost" id="signIn">Продолжить</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Привет, друг!</h1>
                            <p>Заполните форму регистрации, чтобы продолжить!</p>
                            <button className="ghost" id="signUp" onClick={handleClickSign}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login