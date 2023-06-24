import ZLogo from './icons/logo.svg'
import ProfileP from './icons/profile.svg'
import CartI from './icons/cart.svg'
import List from '../Searchbar/icons/list.svg'
import Samsung from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/samsung.png'
import Dell from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/dell.png'
import Acer from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/acer.png'
import Apple from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/apple.png'
import Google from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/google.png'
import Redmi from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/redmi.png'
import Sony from '../../../Pages/SingleItem/component/CategoryList/categoryIcons/sony.png'
import admin from './icons/admin.png'

import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation} from 'react-i18next'
import jwtDecode from 'jwt-decode';

import './Searchbar.scss'
import { useEffect, useState } from 'react'
import { getTotals } from '../../../utils/cartSLice'
import { toast } from 'react-toastify'
import SearchbarI from '../Searchbarinput/SearchbarI'
import { isAdminAuthenticated } from '../../../Helper/auth'

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
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const {cartTotalQuantity} = useSelector((state: RootState) => state.cart);
    const {cartTotalAmount} = useSelector((state: RootState) => state.cart)
    const cart = useSelector((state: { cart: any }) => state.cart);
    const { t } = useTranslation(["common"])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        const token = localStorage.getItem('token');
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
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/authorisation');
        toast.error(`You have logged out`, {
            position: "top-center",
          });
      };

      const token = localStorage.getItem('token');
      const decodedToken = token ? jwtDecode<any>(token) : null;
      const isAdmin = decodedToken && decodedToken.isAdmin;

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
                                {t("Navigation")}
                            </div>
                        </span> 
                        <ul className='Navigation'>
                            <Link to="/brand/SAMSUNG" className='NavItem'><li onClick={() => handleBrandClick("SAMSUNG")}><span className='Lii'><img src={Samsung} alt="samsung icon" width={25}/>{t("Samsung")}</span></li></Link>
                            <Link to="/brand/apple" className='NavItem'><li onClick={() => handleBrandClick("apple")}><span className='Lii'><img src={Apple} alt="apple icon" width={25}/>{t("Apple")}</span></li></Link>
                            <Link to="/brand/acer" className='NavItem'><li onClick={() => handleBrandClick("acer")}><span className='Lii'><img src={Acer} alt="acer icon" width={25}/>{t("Acer")}</span></li></Link>
                            <Link to="/brand/dell" className='NavItem'> <li onClick={() => handleBrandClick("dell")}><span className='Lii'><img src={Dell} alt="dell icon" width={25}/>{t("Dell")}</span></li></Link>
                            <Link to="/brand/google" className='NavItem'> <li onClick={() => handleBrandClick("google")}><span className='Lii'><img src={Google} alt="google icon" width={25}/>{t("Google")}</span></li></Link>
                            <Link to="/brand/redmi" className='NavItem'> <li onClick={() => handleBrandClick("redmi")}><span className='Lii'><img src={Redmi} alt="redmi icon" width={25}/>{t("Redmi")}</span></li></Link>
                            <Link to="/brand/SONY" className='NavItem'><li onClick={() => handleBrandClick("SONY")}><span className='Lii'><img src={Sony} alt="sony icon" width={25}/>{t("Sony")}</span></li></Link>
                        </ul>
                    </div>            
                </div>
                <SearchbarI />
                <div className="actions inner">
                        {isAdmin && (
                            <Link to={'/admin'}>
                                <button className="Admin"><img src={admin} alt="adminicon" width={20}/>{t("Admin")}</button>
                            </Link>
                        )}
                        {isLoggedIn ? (
                            <div className="profile-dropdown">
                                <button className="profile" onClick={handleProfileClick} onMouseEnter={() => setIsExitOpen(true)} onMouseLeave={() => setIsExitOpen(false)}>
                                    <img src={ProfileP} alt="Profile Icon" width={20} height={20} />
                                    <p>{t("Profile")}</p>
                                </button>
                                {isExitOpen && (
                                    <div className="dropdown-content" onMouseEnter={() => setIsExitOpen(true)} onMouseLeave={() => setIsExitOpen(false)}>
                                        <button className='LogoutBtn' onClick={handleLogout}>{t("Logout")}</button>
                                    </div>
                                )}
                            </div>
                            ) : (
                                <button className="profile" onClick={handleProfileClick}>
                                    <img src={ProfileP} alt="Profile Icon" width={20} height={20} />
                                    <p>{t("Profile")}</p>
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