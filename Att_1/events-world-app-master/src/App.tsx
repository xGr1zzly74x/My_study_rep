import React from 'react'
import './App.css'
import Login from '../src/pages/login/login'
import CatalogPlaces from '../src/pages/catalog-places/catalog-places'
import {UserContext} from './contexts/User'

const User =  {
  role: 'user',
  name: '',
}

function App() {
  return (
    <div className='rootStyle'>
      <UserContext.Provider value={User}>
        
        <CatalogPlaces />
      </UserContext.Provider>
    </div>
  )
}

export default App