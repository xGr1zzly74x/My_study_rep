import React, {useState} from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import {Context} from './context'

import Login from '../src/pages/login/login'
import CatalogPlaces from '../src/pages/catalog-places/catalog-places'
import About from '../src/pages/about/about'
import NotFoundPage from '../src/pages/notfoundpage/notfoundpage'

function App() {

  const [g_login, setLogin] = useState<string>('') //Для возможности передать логин на все дочерние компоненты (глобальный useState)

  //функция изменить state логин
  const change_login = (i_login:string) => { 
    setLogin(i_login)
  }

  //Объект для работы с глобальным контекстом логин
  const con_login = {
    change_login,
    g_login
  }

  return (
    <>
    <Context.Provider value={{con_login}}>
      <div className='rootStyle'>
          <Routes>
            <Route path='/'              element={<Login/>}></Route>
            <Route path='/CatalogPlaces' element={<CatalogPlaces/>}></Route>
            <Route path='/About'         element={<About/>}></Route>
            <Route path='*'              element={<NotFoundPage/>}></Route>
           </Routes>
      </div>
      </Context.Provider>
    </>
  )
}

export default App