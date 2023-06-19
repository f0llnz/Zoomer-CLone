import './App.scss'

import Home from './Pages/MainPage/MainPage'
import Detailed from './Pages/SingleItem/ChosenItem'
import SingleItem from './Pages/SingleItem/ChosenItem'
import BrandProducts from './Pages/BrandPages/BrandProducts'
import CartPage from './Pages/CartPage/CartPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'

import {Route, Routes} from 'react-router-dom'
import LoginAndRegister from './Pages/Login-Register/LoginAndRegister'

const App: React.FC = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detailed' element={<Detailed />} />
        <Route path="/product/:id" element={<SingleItem/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/brand/:brand" element={<BrandProducts />} />
        <Route path='/authorisation' element={<LoginAndRegister />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
export default App
