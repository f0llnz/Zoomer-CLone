import ZLogo from './icons/logo.svg'
import SearchI from '../Images/search.png'
import ProfileP from './icons/profile.svg'
import CartI from './icons/cart.svg'
import List from '../Searchbar/icons/list.svg'

import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';

import './Searchbar.scss'
import { useEffect, useState } from 'react'
import { getTotals } from '../../../utils/cartSLice'
import Cookies from 'js-cookie';
import { Toast } from 'react-bootstrap'
import { toast } from 'react-toastify'

interface RootState {
    cart: {
      cartTotalQuantity: number;
      cartTotalAmount:number;
    };
}

interface Token {
    userId: string,
    isAdmin: boolean,
    exp: number
}

function Searchbar() {
    const [isExitOpen, setIsExitOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
    const {cartTotalQuantity} = useSelector((state: RootState) => state.cart);
    const {cartTotalAmount} = useSelector((state: RootState) => state.cart)
    const cart = useSelector((state: { cart: any }) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        const token = Cookies.get('token');
        if (token) {
          const decodedToken = jwtDecode<Token>(token);
          const userId = decodedToken.userId
          console.log(decodedToken)
          navigate(`/profile/${userId}`);
        } else {
          navigate('/authorisation');
        }
      };

    const handleBrandClick = (brand: string) => {
      navigate(`/brand/${brand}`);
    }

    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch])

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        navigate('/');
        toast.error(`You have logged out`, {
            position: "top-center",
          });
      };
    
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
                            <Link to="/brand/SAMSUNG" className='NavItem'><li onClick={() => handleBrandClick("SAMSUNG")}><span className='Lii'>სამსუნგი</span></li></Link>
                            <Link to="/brand/apple" className='NavItem'><li onClick={() => handleBrandClick("apple")}><span className='Lii'>ეფლი</span></li></Link>
                            <Link to="/brand/acer" className='NavItem'><li onClick={() => handleBrandClick("acer")}><span className='Lii'>ეისერი</span></li></Link>
                            <Link to="/brand/dell" className='NavItem'> <li onClick={() => handleBrandClick("dell")}><span className='Lii'>დელი</span></li></Link>
                            <Link to="/brand/google" className='NavItem'> <li onClick={() => handleBrandClick("google")}><span className='Lii'>გუგლი</span></li></Link>
                            <Link to="/brand/redmi" className='NavItem'> <li onClick={() => handleBrandClick("redmi")}><span className='Lii'>რედმი</span></li></Link>
                            <Link to="/brand/SONY" className='NavItem'><li onClick={() => handleBrandClick("SONY")}><span className='Lii'>სონი</span></li></Link>
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
                        {isLoggedIn ? (
                            <div className="profile-dropdown">
                                <button className="profile" onClick={handleProfileClick} onMouseEnter={() => setIsExitOpen(true)} onMouseLeave={() => setIsExitOpen(false)}>
                                    <img src={ProfileP} alt="Profile Icon" width={20} height={20} />
                                    <p>პროფილი</p>
                                </button>
                                {isExitOpen && (
                                    <div className="dropdown-content" onMouseEnter={() => setIsExitOpen(true)} onMouseLeave={() => setIsExitOpen(false)}>
                                        <button className='LogoutBtn' onClick={handleLogout}>გასვლა</button>
                                    </div>
                                )}
                            </div>
                            ) : (
                                <button className="profile" onClick={handleProfileClick}>
                                    <img src={ProfileP} alt="Profile Icon" width={20} height={20} />
                                    <p>პროფილი</p>
                                </button>
                            )}
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