import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
