import React from 'react'
import './App.css'
import {UserContext} from './contexts/User'
import {Routes, Route, Link} from 'react-router-dom'

import Login from '../src/pages/login/login'
import CatalogPlaces from '../src/pages/catalog-places/catalog-places'


const User =  {
  role: 'user',
  name: '',
}

function App() {
  return (
    <div className='rootStyle'>
        <UserContext.Provider value={User}>
          <Login />
        </UserContext.Provider>
    </div>
    
  )
}

export default App