import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { InputText } from '../../components'
import withLogger from '../../hocs/withLogger'
import './styles.css';
import {UserContext} from '../../contexts/User'

//Компонент логин
const Login = () => {
    const value = useContext(UserContext)

    //console.log('UserContext', value)

    const regex_pas   = new RegExp('^[a-z]+$')
    const regex_log   = new RegExp('^[a-zA-Z0-9]+$')
    const regex_email = new RegExp('@')

    //Подключаем хук состояния, эффекта
    const [isSign, setSign]             = useState<boolean>(false)//Для переключения слайдера

    const [userName, setUserName]       = useState<string>('')//Имя пользователя

    const [userPass_sign, setUserPass_sign]     = useState<string>('')//Пароль(вход)
    const [userPass_new1, setUserPass_new1]     = useState<string>('')//Пароль_1(регистрация)
    const [userPass_new2, setUserPass_new2]     = useState<string>('')//Пароль_2(регистрация)
    
    const [isPassOther, setPassOther]   = useState<boolean>(false)//Для определения ошибки в случае несовпадения паролей (регистрация)

    const [isPassError_sign, setPassError_sign] = useState<boolean>(false)//Для валидации пароля  (вход)
    const [isPassError1, setPassError1]         = useState<boolean>(false)//Для валидации пароля1 (регистрация)
    const [isPassError2, setPassError2]         = useState<boolean>(false)//Для валидации пароля2 (регистрация)
    const [isLogError,   setLogError]           = useState<boolean>(false)//Для валидации логина
    const [isEmailError, setemailError]         = useState<boolean>(false)//Для валидации email

    //При изменении пароля_1 записать значение в переменную userPass1
    const handleChangePass_new_1 = (event: any ) => {
        //Меняем состояние переменной setUserPass1
        setUserPass_new1(event.target.value)

        if (!event.target.value){
            setPassError1(false)
        }
        else{
            if (regex_pas.test(event.target.value)) {
                setPassError1(false)
            }
            else{
                setPassError1(true)
            }
        }
    }

    //При изменении пароля_2 записать значение в переменную userPass2
    const handleChangePass_new_2 = (event: any ) => {
        //Меняем состояние переменной setUserPass2
        setUserPass_new2(event.target.value)

        if (!event.target.value){
            setPassError2(false)}
        else{
            if (regex_pas.test(event.target.value)) {
                setPassError2(false)
            }
            else{
                setPassError2(true)
            }
        }
    }

    //При изменении пароля(вход) записать значение в переменную userPass_sign
    const handleChangePass_sign = (event: any ) => {
        //Меняем состояние переменной setUserPass2
        setUserPass_sign(event.target.value)

        if (!event.target.value){
            setPassError_sign(false)}
        else{
            if (regex_pas.test(event.target.value)) {
                setPassError_sign(false)
            }
            else{
                setPassError_sign(true)
            }
        }
    } 

    //при нажатии переключить слайдер записав в перменную isSign противопложное значение
    const handleClickSign = () => {
        setSign(!isSign)
    }

    //Пример записи/запроса имени пользователя в/из локального хранилище Chrome 
    const handleChangeLogin = (event: any) => {
        //Получить значение из стора
        const old_user = localStorage.getItem("UserName") || ''
        const user = event.target.value
        setUserName(user)
        //Записать значение в стор
        localStorage.setItem("UserName", user)

        if (!user){
            setLogError(false)}
        else{
            if (regex_log.test(user)) {
                setLogError(false)
            }
            else{
                setLogError(true)
            }
        }
    }

    const handleChangeEmail = (event: any) => {
        if (!event.target.value){
            setemailError(false)
            console.log(regex_email.test(event.target.value))}
        else{
            if (regex_email.test(event.target.value)) {
                setemailError(false)
                console.log(regex_email.test(event.target.value))
            }
            else{
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
        if (userPass_new1 !== userPass_new2) {
            setPassOther(true)

        } else {
            setPassOther(false)
        }
    })

    const handleClickSend = () => {
        // fetch(`//localhost:4040/login?name=${userName}`)
        
        fetch("//localhost:4040/api/login", {
        method: "post",
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
            name: userName,
            password: userName
        })
        })
        // .then( (response) => {

        //     //do something awesome that makes the world a better place
        // });
    }

    const handleClickGetData = () => {
        window.location.href = 'http://localhost:3000/CatalogPlaces'
    }

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container' 

    return(
        <> 
            <button onClick={handleClickGetData}>Запрос данных о загрязнении</button>

            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
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
                                    onChange={(event: any) => handleChangeLogin(event)}/>
                        {isLogError && <div style={{color: 'red'}}>Недопустимые символы в логине!</div>}

                        <InputText type="text"
                                   className="InputText" 
                                   placeholder="Введите Email" 
                                   onChange={(event: any) => handleChangeEmail(event)}/>
                        {isEmailError && <div style={{color: 'red'}}>Недопустимые символы в email!</div>}

                        <InputText 
                            type="password" 
                            className="InputText" 
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass_new_1(event)}/>
                        {isPassError1 && <div style={{color: 'red'}}>Недопустимые символы в пароле!</div>}

                        <InputText
                            className="InputText"  
                            type="password" 
                            placeholder="Введите пароль повторно" 
                            onChange={(event: any) => handleChangePass_new_2(event)}/>
                        {isPassError2 && <div style={{color: 'red'}}>Недопустимые символы в пароле!</div>}

                        {isPassOther && <div style={{color: 'red'}}>Пароли не совпадают</div>}
                        <button>Регистрация</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Войдите в свою учетную запись</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}

                        {/* <span>or use your account</span> */}
                        <InputText 
                            className="InputText" 
                            type="email" 
                            placeholder="Email"
                            onChange={(event: any) => handleChangeEmail(event)}
                            
                        />
                        {isEmailError && <div style={{color: 'red'}}>Недопустимые символы в email!</div>}

                        <InputText type="password" 
                                   className="InputText" 
                                   placeholder="Пароль"
                                   onChange={(event: any) => handleChangePass_sign(event)}/>
                        {isPassError_sign && <div style={{color: 'red'}}>Недопустимые символы в пароле!</div>}
                        <a href="#">Забыли пароль</a>
                        <button onClick={handleClickSend}>Вход</button>
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

export default withLogger(Login)