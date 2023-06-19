import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import './SPSearchbar.scss';
import { Token } from '../../../../@types/general';
import CategoryList from '../CategoryList/CategoryList';
import ZLogo from '../Imgs/logo.svg';
import SearchI from '../Imgs/search.png';
import ProfileP from '../Imgs/profile.svg';
import CartI from '../Imgs/Cart.svg';
import List from '../Imgs/List.svg';
import { toast } from 'react-toastify';

interface RootState {
  cart: {
    cartTotalQuantity: number;
    cartTotalAmount: number;
  };
}

export default function SPSearchbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));
  const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);
  const { cartTotalAmount } = useSelector((state: RootState) => state.cart);
  const cart = useSelector((state: { cart: any }) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = Cookies.get('token');
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
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/');
    toast.error(`You have logged out`, {
        position: "top-center",
      });
  };


  return (
    <div className="Main">
      <div className="navColumn">
        <Link to="/">
          <img src={ZLogo} width={169} height={70} alt="Zoomer Logo" />
        </Link>
        <div className="searchbar">
          <input className="searchinput" type="text" placeholder="ძიება..." />
          <img src={SearchI} width={20} height={20} alt="SearchIcon" className="loop" />
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
          <p className="WNav">ნავიგაცია</p>
          {isOpen && <CategoryList />}
        </div>
        <div className="orange">
          <ul>
            <li>
              <Link to="/">მთავარი</Link>
            </li>
            <li>კატეგორია</li>
            <li>ბრენდი</li>
            <li>სახელი</li>
          </ul>
        </div>
      </div>
    </div>
  );
}