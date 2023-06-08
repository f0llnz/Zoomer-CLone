import './App.scss'

import Home from './MainPage/MainPage'
import Detailed from './SingleItem/ChosenItem'

import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detailed' element={<Detailed />}/>
      </Routes>
    </div>
  )
}

export default App
