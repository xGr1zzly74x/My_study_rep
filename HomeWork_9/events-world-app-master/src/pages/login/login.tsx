import React, { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { change_auth, change_theme, theme_selector}  from "../../store/slice_login"
import { Context } from '../../context'
import { useForm, SubmitHandler } from "react-hook-form"
import { ToogleSwitch } from '../../components/ToogleSwitch'
import "./styles.css"
import { stat } from "fs"

const Login = () => {

  interface user {
    login_ex: string
    login_new: string
    email: string
    password_new_1: string
    password_new_2: string
    password_ex: string
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    formState: { errors }, 
  } = useForm<user>({
    mode: 'onChange'
  })

  let new_login:(string) = ''

  const dispatch = useDispatch() //Для отправки данных в Redux (вызов только на верхнем уровне)
  const new_state = { auth: false } //Признак успешной авторизации
  const redux_theme = useSelector(theme_selector.get_theme)//Глобальная тема
  const [isSign, setSign] = useState<boolean>(true) //Для переключения слайдера
  const [theme, setTheme] = useState<boolean>(redux_theme)//Локальная тема
  const [mes, setmes] = useState<any>("") //Сообщение
  const {con_login} = useContext(Context)//Передать логин в глобальный параметр на все приложение

  //при нажатии переключить слайдер записав в перменную isSign противопложное значение
  const handleClickSign = () => {
    setSign(!isSign)
    reset()
  }

  useEffect(() => {
    document.body.classList.add("body_login")
    document.body.classList.remove("body_about")
    document.body.classList.remove("body_catalog_places")

    const login_new_e = document.querySelector('#login_new') as HTMLElement
    const login_ex_e = document.querySelector('#login_ex') as HTMLElement
    const password_ex_e = document.querySelector('#password_ex') as HTMLElement
    const password_new_1_e = document.querySelector('#password_new_1') as HTMLElement
    const password_new_2_e = document.querySelector('#password_new_2') as HTMLElement
    const email_e = document.querySelector('#email') as HTMLElement

    let new_tog = {theme: theme}
    dispatch(change_theme(new_tog))
      
    if (errors?.login_new){
        login_new_e.style.border = 'solid red'
    } else{
        login_new_e.style.removeProperty('border')
    }

    if (errors?.login_ex){
        login_ex_e.style.border = 'solid red'
    } else{
        login_ex_e.style.removeProperty('border')
    }

    if (errors?.password_ex){
        password_ex_e.style.border = 'solid red'
    } else{
        password_ex_e.style.removeProperty('border')
    }

    if (errors?.password_new_1){
        password_new_1_e.style.border = 'solid red'
    } else{
        password_new_1_e.style.removeProperty('border')
    }

    if (errors?.password_new_2){
        password_new_2_e.style.border = 'solid red'
    } else{
        password_new_2_e.style.removeProperty('border')
    }

    if (errors?.email){
        email_e.style.border = 'solid red'
    } else{
        email_e.style.removeProperty('border')
    }

    if (mes) {
      alert(mes)
      setmes("")
    }

    //Для отладки увидеть, что контекст доступен на всем приложении App
    if (con_login.g_login){
      console.log(con_login.g_login)
    }      
  })

  //Добавить нового пользователя POST запросом
  //Объекты добавить в BODY
  const handleClickNewUser: SubmitHandler<user> = async (data) => {

      const body: { Login: string; Password: string; Email: string } = {
        Login: data.login_new,
        Password: data.password_new_1,
        Email: data.email,
      }
      let text

      try {
        const response = await fetch("http://localhost:4040/NewUser", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })

        if (!response.ok) {
          text = `Неудачный запрос к базе данных!`
          new_state.auth = false
          new_login = ''

        } else {
          //получить JSON объект
          const resp_json = await response.json()
          if (resp_json.New === `X`) { 
            text = `Пользователь успешно зарегестрирован! Логин: ${resp_json.Login} Пароль: ${resp_json.Password} Email: ${resp_json.Email}`
            new_state.auth = true
            new_login = (resp_json.Login)
            reset()//сбросить поля формы

          } else {
            text = `В базе данных уже создан пользователь логин: ${resp_json.Login} и/или email: ${resp_json.Email}`
            new_state.auth = false
            new_login = ''
          }
        }
      } catch (e) {
        text = "Нет ответа от сервера базы данных!"
        new_state.auth = false
        new_login = ''
      }
      setmes(text)
      con_login.change_login(new_login)
      dispatch(change_auth(new_state))
    }

  //Проверить логин + пароль пользователя GET запросом
  //Объекты добавить в HEADERS
  const handleClickCheckUser: SubmitHandler<user> = async (data) => {

      const headers: { Login: string; Password: string } = { Login: data?.login_ex, Password: data?.password_ex }
      let text

      try {
        const response = await fetch("http://localhost:4040/CheckUser", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Login: headers.Login,
            Password: headers.Password,
          },
        })

        if (!response.ok) {
          text = `Неудачный запрос к базе данных!`
          new_state.auth = false
          new_login = ''

        } else {
          //получить JSON объект
          const resp_json = await response.json()
          if (resp_json.Login === `none` || resp_json.Password === `none`) {
            text = `Учетная запись логин: ${headers.Login} пароль: ${headers.Password} не найдена!`
            new_state.auth = false
            new_login = ''

          } else {
            text = `Успешная авторизация! Логин: ${resp_json.Login} Пароль: ${resp_json.Password}`
            new_state.auth = true
            new_login = (resp_json.Login)
            reset()//сбросить поля формы
          }
        }
      } catch (e) {
        text = "Нет ответа от сервера базы данных!"
        new_state.auth = false
        new_login = ''
      }
      setmes(text)
      con_login.change_login(new_login)
      dispatch(change_auth(new_state))
    }

    const f_switch = () => {
      setTheme(!theme)
      
    }

  const handleClickGetData = () => {
    window.location.href = "http://localhost:3000/CatalogPlaces"
  }

  const handleClickAbout = () => {
    window.location.href = "http://localhost:3000/About"
  }

  const rightPanelActive = isSign ? "container" : "container right-panel-active"

  return (
    <>
       <button onClick={handleClickGetData}>Запрос данных о загрязнении</button>
       <button onClick={handleClickAbout}>О сервисе</button>

      <ToogleSwitch IsOn={theme} Switch={f_switch}></ToogleSwitch>

      <div className={rightPanelActive} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit(handleClickNewUser)}>
            <h1>Создайте пользователя</h1>

            <input
              type="text"
              className="InputText"
              id="login_new"
              placeholder="Введите логин"
              {...!isSign && ({...register("login_new", {
                required: "Поле логин является обязательным!",
                minLength: {
                  value: 5,
                  message: "Мин. длина поля логин 5 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Макс. длина поля логин 20 символов!",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Недопустимые символы в логине!",
                }
              })})}
            />
            {errors?.login_new && <div style={{ color: "red", fontSize: 12 }}>{errors.login_new.message}</div>}

            <input
              type="text"
              id="email"
              className="InputText"
              placeholder="Введите Email"
              {...!isSign && ({...register("email", {
                required: "Поле email является обязательным!",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Неверно указан Email!",
                }
              })})}
            />

            {errors?.email && <div style={{ color: "red", fontSize: 12 }}>{errors.email.message}</div>}

            <input
              type="password"
              id="password_new_1"
              className="InputText"
              placeholder="Введите пароль"
              {...!isSign && ({...register("password_new_1", {
                required: "Поле пароль является обязательным!",
                minLength: {
                  value: 5,
                  message: "Мин. длина пароля 5 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Макс. длина пароля 20 символов!",
                },
                pattern: {
                  value: /^[a-z0-9-_*]+$/,
                  message: "Недопустимые символы в пароле!",
                },
                validate: (value:string) => {
                    const pass_2 = getValues("password_new_2")
                    if (value === pass_2 && errors.password_new_2?.message === 'Пароли не совпадают' ){
                        clearErrors("password_new_2")
                    }
                    return value === pass_2 || "Пароли не совпадают"
                }
              })})}
            />
            {errors?.password_new_1 && <div style={{ color: "red", fontSize: 12 }}>{errors.password_new_1.message}</div>}

            <input
              className="InputText"
              id="password_new_2"
              type="password"
              placeholder="Введите пароль повторно"
              {...!isSign && ({...register("password_new_2", {
                required: "Поле пароль является обязательным!",
                minLength: {
                  value: 5,
                  message: "Мин. длина пароля 5 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Макс. длина пароля 20 символов!",
                },
                pattern: {
                  value: /^[a-z0-9-_*]+$/,
                  message: "Недопустимые символы в пароле!",
                },
                validate: (value:string) => {
                    const pass_1= getValues("password_new_1")
                    if (value === pass_1 && errors.password_new_1?.message === 'Пароли не совпадают' ){
                        clearErrors("password_new_1")
                    }
                    return value === pass_1 || "Пароли не совпадают"
                }
              })})}
            />
            {errors?.password_new_2 && <div style={{ color: "red", fontSize: 12 }}>{errors.password_new_2.message}</div>}
            <button>Регистрация</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit(handleClickCheckUser)}>
            <h1>Войдите в свою учетную запись</h1>
            <input
              className="InputText"
              id="login_ex"
              type="text"
              placeholder="Введите логин"
              {...isSign && ( {...register("login_ex", {
                required: "Поле логин является обязательным!",
                minLength: {
                  value: 5,
                  message: "Мин. длина поля логин 5 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Макс. длина поля логин 20 символов!",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Недопустимые символы в логине!",
                }
              })})}
            />
            
            {errors?.login_ex && <div style={{ color: "red", fontSize: 12 }}>{errors.login_ex.message}</div>}

            <input
              type="password"
              id="password_ex"
              className="InputText"
              placeholder="Введите пароль"
              {...isSign && ({...register("password_ex", {
                required: "Поле пароль является обязательным!",
                minLength: {
                  value: 5,
                  message: "Мин. длина пароля 5 символов!",
                },
                maxLength: {
                  value: 20,
                  message: "Макс. длина пароля 20 символов!",
                },
                pattern: {
                  value: /^[a-z0-9-_*]+$/,
                  message: "Недопустимые символы в пароле!",
                }
              })})}
            />
            {errors?.password_ex && <div style={{ color: "red", fontSize: 12 }}>{errors.password_ex.message}</div>}

            <a href="#">Забыли пароль</a>
            <button>Вход</button>
          </form>
        </div>

        <div className="overlay-container right-panel-active">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Войти в учетную запись</h1>
              <p>Для продолжения выполните вход в вашу учетную запись</p>
              <button onClick={handleClickSign} className="ghost" id="signIn">
                Продолжить
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Привет, друг!</h1>
              <p>Заполните форму регистрации, чтобы продолжить!</p>
              <button className="ghost" id="signUp" onClick={handleClickSign}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
