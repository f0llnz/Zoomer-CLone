import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../utils/cartSLice';
import { useTranslation} from 'react-i18next'
import { useNavigate } from 'react-router-dom';

import './ItemBody.scss';

import arrows from '../Imgs/new-compare.svg';
import location from '../Imgs/location.svg';
import Newcart from '../Imgs/new-cart.svg';
import Eye from '../Imgs/Eye.svg';
import Lock from '../Imgs/Lock.svg';
import Amex from '../Imgs/amex.png';
import MasterC from '../Imgs/mastercard.png';
import Visa from '../Imgs/visa.png';
import Taxfree from '../Imgs/taxfree.svg';
import Delete from '../Imgs/delete-332.png'

import { CartItem, ChosenListItems } from '../../../../@types/general';
import ajax from '../../../../utils/ajax';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

export default function ItemBody() {
  const [singleProduct, setSingleProduct] = useState<ChosenListItems | null>(null);
  const [selectedMemory, setSelectedMemory] = useState('128GB');
  const [selectedColor, setSelectedColor] = useState('#0a3251');
  const [price, setPrice] = useState<number | null>(singleProduct?.price || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t } = useTranslation(["common"])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleMemoryChange = (memory: string) => {
    setSelectedMemory(memory);

    if (memory === '256GB') {
      setPrice(singleProduct?.price! * 2);
    } else {
      setPrice(singleProduct?.price!);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const { id } = useParams();

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await fetch(`http://localhost:8080/product/${id}`);
        const data = await res.json();
        setSingleProduct(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getItem();
  }, [id]);

  useEffect(() => {
    if (singleProduct) {
      setPrice(singleProduct.price);
    }
  }, [singleProduct]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const handleBuy = () =>{
    const token = localStorage.getItem('token'); 
    if (token){
      navigate('/Checkout')
    }else{
      navigate('/authorisation')
      toast.info(`You have to Log in first`, {
        position: "top-center",
      });
    }
  }

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<any>(token) : null;
  const isAdmin = decodedToken && decodedToken.isAdmin;

  const handleDeleteProduct = async (productId: number) => {
    if (isAdmin) {
      try {
        const token = localStorage.getItem('token'); 

        const response = await ajax.delete(`http://localhost:8080/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        console.log('Product deleted successfully');
        navigate('/')
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

    return(
      <div className="ChosenItem">
        <div className="itembody">
          <div className="product-img">
            <img
              src={singleProduct?.images?.[selectedImageIndex]}
              className="ImgIcon"
              alt="phonepic"
              width={350}
            />
            <div className="underimages">
              {singleProduct?.images?.slice(1).map((image, index) => (
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  width={70}
                  className={`piC ${selectedImageIndex === index + 1 ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleImageChange(index + 1)}
                />
              ))}
            </div>
          </div>
                <div className="productinfo">
                    <div className="generalname">
                        <div className="firstthree">
                            <p>{singleProduct.brand}</p>
                            <h6>#XZOOM-{singleProduct.id}</h6>
                            {isAdmin && <button className='Deletebutton' onClick={() => handleDeleteProduct(Number(singleProduct.id))}><img src={Delete} alt="deleteicon" width={20}/></button>}
                        </div>
                        <h3 style={{ color: selectedColor }}>{singleProduct.title}</h3>
                        <div className="nexttwo">
                            <p><img src={arrows} alt="arrows" style={{ marginRight: '10px' }} />{t("Compare")}</p>
                            <p><img src={location} alt="location" style={{ marginRight: '10px' }} />{t("Instock")}</p>
                        </div>
                    </div>
                    <div className="infocustom">
                        <div className="leftt">
                            <p>
                                <span className="light">{t("Color")}:</span>
                                <span className="dark"> Blue</span>
                            </p>
                                <div className="colors">
                                <div className={`a g ${selectedColor === 'Black' ? 'selected' : ''}`} onClick={() => handleColorChange('Black')}></div>
                                <div className={`b g ${selectedColor === 'Pink' ? 'selected' : ''}`} onClick={() => handleColorChange('Pink')}></div>
                                <div className={`c g ${selectedColor === 'Beige' ? 'selected' : ''}`} onClick={() => handleColorChange('Beige')}></div>
                                <div className={`d g ${selectedColor === 'Gray' ? 'selected' : ''}`} onClick={() => handleColorChange('Gray')}></div>
                                <div className={`e g ${selectedColor === 'Red' ? 'selected' : ''}`} onClick={() => handleColorChange('Red')}></div>
                                <div className={`f g ${selectedColor === '#0a3251' ? 'selected' : ''}`} onClick={() => handleColorChange('#0a3251')}></div>
                            </div>
                            <p>
                                <span className="light">{t("Memory")}:</span>
                                <span className="dark"> 128GB</span>
                            </p>
                            <div className="storage">
                            <button
                                className={`a-a ${selectedMemory === '128GB' ? 'selected' : ''}`}
                                onClick={() => handleMemoryChange('128GB')}
                            >
                                128GB
                            </button>
                            <button
                                className={`a-b ${selectedMemory === '256GB' ? 'selected' : ''}`}
                                onClick={() => handleMemoryChange('256GB')}
                            >
                                256GB
                            </button>
                            </div>
                            <p>
                                <span className="light">{t("Model")}:</span>
                                <span className="dark"> 14</span>
                            </p>
                            <div className="Model">
                                <div className="b-a">Base</div>
                                <div className="b-b">Pro</div>
                            </div>
                        </div>
                        <div className="rightt">
                            <div className="righttup">
                                <p>
                                    <span className="light">{t("ScreenSize")}:  ------------  </span>
                                    <span className="dark"> 6.1 inches</span>
                                </p>
                                <p>
                                    <span className="light">{t("RAM")} ------ </span>
                                    <span className="dark"> 6GB</span>
                                </p>
                                <p>
                                    <span className="light">{t("Innermemory")}:  ----------  </span>
                                    <span className="dark"> 128GB</span>
                                </p>
                                <p>
                                    <span className="light">{t("Maincamera")}: ----------</span>
                                    <span className="dark"> 12+12 MP</span>
                                </p>
                            </div>
                            <div className="righttdown">
                                <p>
                                    {singleProduct.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Sale">
                <div className="price">
                    <div className="priceinfo">
                        <p className='Original'>{price} ₾</p>
                        <p className='Now'>{price != null ? (price - (price * 10) / 100).toFixed(2) : ""} ₾ </p>
                        <p><img src={Eye} alt="eye" style={{ marginRight: '10px' }} />{t("Followprice")}</p>
                        <p><img src={Lock} alt="lock" style={{ marginRight: '10px' }} />{t("Priceprotection")}</p>
                    </div>
                    <div className="buttons">
                        <div className="up">
                        <button className="shoppingbag" onClick={() => handleIncreaseQuantity({ ...singleProduct, cartQuantity: 1, id: parseInt(singleProduct.id) } as CartItem)}>
                                <img src={Newcart} alt="" />
                            </button>
                            <button onClick={handleBuy} className='Buy'>{t("Buy")}</button>
                        </div>
                        <button className='Lower'> 
                            <span className="light">{t("Onlineinstallment")}</span>
                            <span className="dark"> 74 ₾ - {t("From")}</span>
                        </button>
                        <div className="payment">
                            <img src={Taxfree} alt="Taxfree" width={45}/>
                            <img src={Amex} alt="Amex" width={45}/>
                            <img src={MasterC} alt="MC" width={45}/>
                            <img src={Visa} alt="Visa" width={45}/>
                        </div>
                    </div>
                </div>
            </div>
      </div>

    )
}




