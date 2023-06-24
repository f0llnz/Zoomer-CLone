import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation} from 'react-i18next';
import jwtDecode from 'jwt-decode';

import './SPSearchbar.scss';
import { Token } from '../../../../@types/general';
import CategoryList from '../CategoryList/CategoryList';
import ZLogo from '../Imgs/logo.svg';
import ProfileP from '../Imgs/profile.svg';
import CartI from '../Imgs/Cart.svg';
import List from '../Imgs/List.svg';
import { toast } from 'react-toastify';
import { getTotals } from '../../../../utils/cartSLice';

import admin from '../../../../components/Navbar/Searchbar/icons/admin.png'
import SearchbarI from '../../../../components/Navbar/Searchbarinput/SearchbarI';

interface RootState {
  cart: {
    cartTotalQuantity: number;
    cartTotalAmount: number;
  };
}

export default function SPSearchbar() {
  const { t } = useTranslation(["common"])
  const [isOpen, setIsOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);
  const { cartTotalAmount } = useSelector((state: RootState) => state.cart);
  const cart = useSelector((state: { cart: any }) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<Token>(token);
      const userId = decodedToken.userId;
      console.log(decodedToken);
      navigate(`/profile/${userId}`);
    } else {
      navigate('/authorisation');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    toast.error(`You have logged out`, {
        position: "top-center",
      });
  };

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<any>(token) : null;
  const isAdmin = decodedToken && decodedToken.isAdmin;

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])
  

  return (
    <div className="Main">
      <div className="navColumn">
        <Link to="/">
          <img src={ZLogo} width={169} height={70} alt="Zoomer Logo" />
        </Link>
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
          <Link to={'/cart'} className="textdeco">
            <div className="cart inner">
              <img src={CartI} alt="Cart Icon" width={20} height={20} />
              <div className="PnA">
                <div className="orng">{cartTotalQuantity}</div>
                <p>{cartTotalAmount.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="Nav">
        <div className="blue">
          <img src={List} className="ListIcon" alt="ListIcon" width={20} height={20} onClick={() => setIsOpen((prev) => !prev)} />
          <p className="WNav">{t("Navigation")}</p>
          {isOpen && <CategoryList />}
        </div>
        <div className="orange">
          <ul>
            <li>
              <Link to="/">{t("Main")}</Link>
            </li>
            <li>{t("Category")}</li>
            <li>{t("Brand")}</li>
            <li>{t("Title")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}