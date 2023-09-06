import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { InputText } from '../../components'
import withLogger from '../../hocs/withLogger'
import './styles.css';
import {UserContext} from '../../contexts/User'

//Компонент логин
const Login = () => {
    const value = useContext(UserContext)

    //console.log('UserContext', value)

    const regex_pas = new RegExp('^[a-z]+$')
    const regex_log = new RegExp('^[a-zA-Z0-9]+$')
    const regex_email = new RegExp('*[@]*')

    //Объявление переменных состояния (имя, функция для измененения)
    const [isSign, setSign]             = useState<boolean>(false)//Для переключения слайдера

    const [userName, setUserName]       = useState<string>('')//Имя пользователя

    const [userPass1, setUserPass1]     = useState<string>('')//Пароль_1
    const [userPass2, setUserPass2]     = useState<string>('')//Пароль_2
    
    const [isPassOther, setPassOther]   = useState<boolean>(false)//Для определения ошибки в случае несовпадения паролей

    const [isPassError1, setPassError1] = useState<boolean>(false)//Для валидации пароля1
    const [isPassError2, setPassError2] = useState<boolean>(false)//Для валидации пароля2
    const [isLogError,   setLogError]   = useState<boolean>(false)//Для валидации логина
    const [isEmailError, setemailError] = useState<boolean>(false)//Для валидации email

    //При изменении пароля_1 записать значение в переменную userPass1
    const handleChangePass1 = (event: any ) => {
        //Меняем состояние переменной setUserPass1
        setUserPass1(event.target.value)

        if (!event.target.value){
            setPassError1(false)}
        else{
            if (regex_pas.test(event.target.value)) {
                setPassError1(false)
            }
            else{
                setPassError1(true)
            }
        }
        //ВНИМАНИЕ! Косноль всегда будет выводить предыдущее состояние переменной UseEffect синхронный!
        //console.log('userPass1', userPass1)
        //console.log('userPass2', userPass2)
    }

    //При изменении пароля_2 записать значение в переменную userPass2
    const handleChangePass2 = (event: any ) => {
        //Меняем состояние переменной setUserPass2
        setUserPass2(event.target.value)

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
        //ВНИМАНИЕ! Косноль всегда будет выводить предыдущее состояние переменной UseEffect синхронный!
        //console.log('userPass1', userPass1)
        //console.log('userPass2', userPass2)
    } 

    //при нажатии переключить слайдер записав в перменную isSign противопложное значение
    const handleClickSign = () => {
        setSign(!isSign)
    }

    //Пример записи/запроса имени пользователя в/из локального хранилище Chrome 
    //ВНИМАНИЕ! Косноль всегда будет выводить предыдущее состояние переменной UseEffect синхронный!
    const handleChangeLogin = (event: any) => {
        //Получить значение из стора
        const old_user = localStorage.getItem("UserName") || ''
        const user = event.target.value
        setUserName(user)
        //Записать значение в стор
        localStorage.setItem("UserName", user)
        console.log(regex_log.test(user))

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
            setemailError(false)}
        else{
            if (regex_email.test(event.target.value)) {
                setemailError(false)
            }
            else{
                setemailError(true)
            }
        }
    }

    //Эффект будет вызывать каждый раз при рендере компонента (если указать ,[] то вызов будет только при 1 рендере).
    //Можно запускать эффект в зависимости от переменных в [], когда они все не равны.
    //Вызовем эффект для проверки паролей
    //Проверку на совпадение можно также сделать записав if else в handleChangePass1 и handleChangePass2, тогда useEffect не нужен, но так короче!
    useEffect(() => {
        if (userPass1 !== userPass2) {
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

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container' 

    return(
        <>     
            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Соаздайте пользователя</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span> */}

                        <InputText type="text" 
                                    placeholder="Введите логин" 
                                    onChange={(event: any) => handleChangeLogin(event)}/>
                        {isLogError && <div style={{color: 'red'}}>Недопустимые символы в логине!</div>}

                        <InputText type="email" 
                                    placeholder="Введите Email" 
                                    onChange={(event: any) => handleChangeEmail(event)}/>
                        {isEmailError && <div style={{color: 'red'}}>Недопустимые символы в email!</div>}

                        <InputText 
                            type="text" 
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass1(event)}/>
                        {isPassError1 && <div style={{color: 'red'}}>Недопустимые символы в пароле!</div>}

                        <InputText 
                            type="text" 
                            placeholder="Введите пароль повторно" 
                            onChange={(event: any) => handleChangePass2(event)}/>
                        {isPassError2 && <div style={{color: 'red'}}>Недопустимые символы в пароле!</div>}

                        {isPassOther && <div style={{color: 'red'}}>Пароли не совпадают</div>}
                        <button>Регистрация</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your account</span> */}
                        <InputText 
                            type="email" 
                            placeholder="Email"
                            // onChange={(e: any) => handleChangeLogin(e)}
                            value={userName}
                        />
                        <InputText type="password" placeholder="Пароль" />
                        <a href="#">Забыли пароль</a>
                        <button onClick={handleClickSend}>Вход</button>
                    </form>
                </div>

                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Войти в учетную запись</h1>
                            <p>Для продолжения выполните вход в вашу учетную запись</p>
                            <button onClick={handleClickSign} className="ghost" id="signIn">Вход</button>
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