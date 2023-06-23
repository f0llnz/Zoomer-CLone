import './LoginAndRegister.scss'

import { useState } from 'react'

import Login from './Login/Login';
import Register from './Register/Register';
import Infobar from '../../components/Navbar/Infobar/Infobar'
import Navbar from '../SingleItem/component/Navbar2/SPSearchbar'
import Footer from '../../components/Footer/Footer';

const LoginAndRegister = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
  
    const handleRegisterClick = () => {
      setShowLogin(false);
      setShowRegister(true);
    };
  
    const handleLoginClick = () => {
      setShowLogin(true);
      setShowRegister(false);
    };
  
    return (
      <div className="Authorisation">
            <Infobar />
            <Navbar />
        <div className="choosetheone">
          <div className="buttonsA">
            <button
                className={showLogin ? 'active' : ''}
                onClick={handleLoginClick}
                >
                ავტორიზაცია
            </button>
            <button
                className={showRegister ? 'active' : ''}
                onClick={handleRegisterClick}
                >
                რეგისტრაცია
            </button>
          </div>
          <div className="mainparts">
            {showLogin && <Login />}
            {showRegister && <Register />}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default LoginAndRegister;