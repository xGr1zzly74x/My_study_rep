import React from 'react'
import './App.css'
import { UserContext } from './contexts/User'
import { Routes, Route} from 'react-router-dom'

import Login from '../src/pages/login/login'
import CatalogPlaces from '../src/pages/catalog-places/catalog-places'
import About from '../src/pages/about/about'
import NotFoundPage from '../src/pages/notfoundpage/notfoundpage'

const User = {
  role: 'user',
  name: '',
}

function App() {
  return (
    <>
      <div className='rootStyle'>
        <UserContext.Provider value={User}>
          <Routes>
            <Route path='/'              element={<Login/>}></Route>
            <Route path='/CatalogPlaces' element={<CatalogPlaces/>}></Route>
            <Route path='/About'         element={<About/>}></Route>
            <Route path='*'              element={<NotFoundPage/>}></Route>
           </Routes>
        </UserContext.Provider>
      </div>
    </>
  )
}

export default App