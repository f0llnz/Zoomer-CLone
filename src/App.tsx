import './App.scss'

import { useEffect, useState } from 'react'

import Home from './Pages/MainPage/MainPage'
import Detailed from './Pages/SingleItem/ChosenItem'

import {Route, Routes} from 'react-router-dom'
import SingleItem from './Pages/SingleItem/ChosenItem'



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detailed' element={<Detailed />}/>
        <Route path="/product/:id" element={<SingleItem/>} />
        <Route path="/"></Route>
      </Routes>
    </div>
  )
}

export default App
