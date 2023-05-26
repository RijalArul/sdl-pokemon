import React from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/Home'
import DetailPage from './pages/Detail'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/pokemon/:id' element={<DetailPage />}></Route>
    </Routes>
  )
}

export default App
