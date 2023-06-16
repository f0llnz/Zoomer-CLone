import './App.scss'

import Home from './Pages/MainPage/MainPage'
import Detailed from './Pages/SingleItem/ChosenItem'
import SingleItem from './Pages/SingleItem/ChosenItem'
import BrandProducts from './Pages/BrandPages/BrandProducts'
import CartPage from './Pages/CartPage/CartPage'

import {Route, Routes} from 'react-router-dom'

const App: React.FC = () => {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detailed' element={<Detailed />} />
        <Route path="/product/:id" element={<SingleItem/>}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path="/SAMSUNG" element={<BrandProducts />}/>
        <Route path="/apple" element={<BrandProducts />}/>
        <Route path="/acer" element={<BrandProducts />}/>
        <Route path="/dell" element={<BrandProducts />}/>
        <Route path="/google" element={<BrandProducts />}/> 
        <Route path="/redmi" element={<BrandProducts />}/>
        <Route path="/SONY" element={<BrandProducts />}/>
      </Routes>
    </div>
  )
}
export default App
