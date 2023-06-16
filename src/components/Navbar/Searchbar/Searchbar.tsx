import ZLogo from './icons/logo.svg'
import SearchI from '../Images/search.png'
import ProfileP from './icons/profile.svg'
import CartI from './icons/cart.svg'
import List from '../Searchbar/icons/list.svg'

import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Searchbar.scss'
import { useEffect } from 'react'
import { getTotals } from '../../../utils/cartSLice'

interface RootState {
    cart: {
      cartTotalQuantity: number;
      cartTotalAmount:number;
    };
}

function Searchbar() {
    const {cartTotalQuantity} = useSelector((state: RootState) => state.cart);
    const {cartTotalAmount} = useSelector((state: RootState) => state.cart)
    const cart = useSelector((state: { cart: any }) => state.cart);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch])
  
    
    return(
        <div className="mteli">
            <div className="body">
                <div className="logo">
                    <div className="navColumn">   
                        <img src={ZLogo} width={169} height={70} alt="Zoomer Logo" />
                    </div>
                    <div className="Vnavbar">
                        <span className='Header'>
                            <div> 
                                <img src={List} className='ListN' alt="" />
                            </div>
                            <div className='Hname'>
                                ნავიგაცია
                            </div>
                        </span> 
                        <ul className='Navigation'>
                            <Link to="/SAMSUNG" className='NavItem'><li className='Lii'>სამსუნგი</li></Link>
                            <Link to="/apple" className='NavItem'><li className='Lii'>ეფლი</li></Link>
                            <Link to="/acer" className='NavItem'><li className='Lii'>ეისერი</li></Link>
                            <Link to="/dell" className='NavItem'><li className='Lii'>დელი</li></Link>
                            <Link to="/google" className='NavItem'><li className='Lii'>გუგლი</li></Link>
                            <Link to="/redmi" className='NavItem'><li className='Lii'>რედმი</li></Link>
                            <Link to="/SONY" className='NavItem'><li className='Lii'>სონი</li></Link>
                        </ul>
                    </div>            
                    </div>
                <div className="searchbar">
                    <input
                    className='searchinput' 
                    type="text"
                    placeholder='ძიება...'
                    />
                    <img src={SearchI} width={20} height={20} alt="SearchIcon" className='loop' />
                </div>
                <div className="actions inner">
                    <div className="profile">
                        <img src={ProfileP} alt="Profile Icon" width={20} height={20}/>
                        <p>პროფილი</p>
                    </div>
                    <Link to={'/cart'} className='textdeco'>
                        <div className="cart inner">
                            <img src={CartI} alt="Cart Icon"  width={20} height={20}/>
                            <div className="PnA">
                                <div className="orng">
                                    {cartTotalQuantity}
                                </div>
                                <p>{cartTotalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Searchbar;