import React from 'react'
import './App.css'
import Login from '../src/pages/login/login'
import {UserContext} from './contexts/User'

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