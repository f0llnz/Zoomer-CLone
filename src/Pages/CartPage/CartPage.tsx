import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../../@types/general";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../../utils/cartSLice";
import { useTranslation} from 'react-i18next'
import {useEffect} from 'react'

import Infobar from '../../components/Navbar/Infobar/Infobar';
import Navbar from '../SingleItem/component/Navbar2/SPSearchbar';

import Img from './Icon/shoppping icon.svg';
import Close from './Icon/close.svg'

import './CartPage.scss';
import Footer from "../../components/Footer/Footer";


export default function CartPage() {
  const cart = useSelector((state: { cart: any }) => state.cart);
  const { t } = useTranslation(["common"])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  const handleRemoveFromCart = (cartItem:CartItem) => {
    dispatch(removeFromCart(cartItem))
  }

  const handleDecreaseQuantity = (cartItem:CartItem) => {
    dispatch(decreaseCart(cartItem))
  }

  const handleIncreaseQuantity = (cartItem:CartItem) => {
    dispatch(addToCart(cartItem))
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className="cart-container">
      <div className="firsttwo">
        <Infobar />
        <Navbar />
      </div>
      {cart.cartItems.length === 0 ? (
        <div className="empty-cart">
          <Link to={'/'}>
            <div className="cart-text">
              <img src={Img} alt="arrow image" width={100}/>
              <h4>{t("Cartisempty")}</h4>
              <h5>{t("Cartmessage")}</h5>
            </div>
          </Link>
        </div>
      ) : (
        <div className="cart-items">
              <div className="cart-left">
                <div className="titles">
                  <h3 className="carttitle">{t("Carttitle")}</h3>
                  <h3 className="cartquantity">{t("Cartquantity")}</h3>
                  <h3 className="cartprice">{t("Price")}</h3>
                  <h3 className="cartsum">{t("Sum")}</h3>
                </div>
                <div className="cart-items-body">
                {cart.cartItems?.map((cartItem: any) => ( 
                    <div className="both-cart">  
                        <div className="cartimg">
                            <button className="XI" onClick={() => handleRemoveFromCart(cartItem)}><img src={Close} alt="x-icon"/></button>
                            <img src={cartItem.images[0]} alt="" width={69} />
                        </div>
                        <div className="cartInfo">
                            <p className="cartP aa">{cartItem.title}</p>
                            <div className="cartP bb">
                              <button onClick={() => handleDecreaseQuantity(cartItem)}>-</button>
                              <div className="quantity">
                                  {cartItem.cartQuantity}
                              </div>
                              <button onClick={() => handleIncreaseQuantity(cartItem)}>+</button>
                            </div>
                            <p className="cartP cc">{parseFloat(cartItem.price).toFixed(2)}</p>
                            <p className="cartP dd">{(parseFloat(cartItem.price) * cartItem.cartQuantity).toFixed(2)}</p>
                        </div>
                     </div>
                 ))}
                </div>
                <div className="clear-button">
                  <button className="clear-cart" onClick={() => handleClearCart()}>{t("Clearthecart")}</button>
                </div>
              </div>
              <div className="cart-right">
                <div className="firstt">
                  <h2>{t("Sum")}</h2>
                </div>
                <div className="secondd">
                  <p>{t("Balance")}:_ _ _ _ _ _ _ _  {parseFloat(cart.cartTotalAmount).toFixed(2)}</p>
                </div>
                <div className="thirdd">
                  <p>{t("Sum")}:_ _ _ _ _ _ _ _  {parseFloat(cart.cartTotalAmount).toFixed(2)}</p>
                </div>
                <button className="cart-checkout">{t("Buy")}</button>
              </div>
            </div>
      )}
      <Footer />
    </div>
  );
}