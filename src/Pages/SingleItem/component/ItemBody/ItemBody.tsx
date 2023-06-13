import './ItemBody.scss'

import FirstPic from '../Imgs/PhonePic1.jpeg'
import SecondPic from '../Imgs/phonepic2.jpeg'
import ThirdPic from '../Imgs/phonepic3.jpeg'
import AppleIcon from '../Imgs/appleicon.png'
import arrows from '../Imgs/new-compare.svg'
import location from '../Imgs/location.svg'
import Newcart from '../Imgs/new-cart.svg'
import Eye from '../Imgs/Eye.svg'
import Lock from '../Imgs/Lock.svg'
import Amex from '../Imgs/amex.png'
import MasterC from '../Imgs/mastercard.png'
import Visa from '../Imgs/visa.png'
import Taxfree from '../Imgs/taxfree.svg'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ajax from '../../../../utils/service/ajax';
import { ChosenListItems } from '../../../../@types/general'




export default function ItemBody(){
    const [singleProduct, setSingleProduct] = useState<ChosenListItems | null>(null);

    const { id } = useParams();
    console.log(id);
  
    useEffect(() => {
        const getItem = async () => {
          try {
            const res = await fetch(`http://localhost:8080/product/${id}`);
            const data = await res.json();
            setSingleProduct(data);
            console.log(singleProduct)
          } catch (error) {
            console.log("error", error);
          }
        };
        getItem();
      }, [id]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

    return(
        <div className="ChosenItem">
            <div className="itembody">
                <div className="product-img">
                    <img src={singleProduct?.images?.[0]} className='ImgIcon' alt="phonepic" width={350}/>
                    <div className="underimages">
                    {singleProduct?.images?.slice(1).map((image, index) => (
                    <img src={image} alt={`Product Image ${index + 1}`} width={70} className='piC' key={index} />
                    ))}
                    </div>
                </div>
                <div className="productinfo">
                    <div className="generalname">
                        <div className="firstthree">
                            <p>{singleProduct.brand}</p>
                            <h6>#XZOOM-{singleProduct.id}</h6>
                        </div>
                        <h3>{singleProduct.title}</h3>
                        <div className="nexttwo">
                            <p><img src={arrows} alt="arrows" style={{ marginRight: '10px' }} />შედარება</p>
                            <p><img src={location} alt="location" style={{ marginRight: '10px' }} />მარაგშია</p>
                        </div>
                    </div>
                    <div className="infocustom">
                        <div className="leftt">
                            <p>
                                <span className="light">ფერი:</span>
                                <span className="dark"> Blue</span>
                            </p>
                            <div className="colors">
                                <div className="a g"></div>
                                <div className="b g"></div>
                                <div className="c g"></div>
                                <div className="d g"></div>
                                <div className="e g"></div>
                                <div className="f g"></div>
                            </div>
                            <p>
                                <span className="light">მეხსიერება:</span>
                                <span className="dark"> 128GB</span>
                            </p>
                            <div className="storage">
                                <div className="a-a">128GB</div>
                                <div className='a-b'>256GB</div>
                            </div>
                            <p>
                                <span className="light">მოდელი:</span>
                                <span className="dark"> 14</span>
                            </p>
                            <div className="Model">
                                <div className="b-a">14</div>
                                <div className="b-b">14 Plus</div>
                            </div>
                        </div>
                        <div className="rightt">
                            <div className="righttup">
                                <p>
                                    <span className="light">ეკრანის ზომა:  ------------  </span>
                                    <span className="dark"> 6.1 inches</span>
                                </p>
                                <p>
                                    <span className="light">ოპერატიული მეხსიერება  ------ </span>
                                    <span className="dark"> 6GB</span>
                                </p>
                                <p>
                                    <span className="light">შიდა მეხსიერება:  ----------  </span>
                                    <span className="dark"> 128GB</span>
                                </p>
                                <p>
                                    <span className="light">მთავარი კამერა: ----------</span>
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
                        <p className='Original'>{singleProduct.price - 100} ₾</p>
                        <p className='Now'>{singleProduct.price} ₾</p>
                        <p><img src={Eye} alt="eye" style={{ marginRight: '10px' }} /> ფასის კონტროლი</p>
                        <p><img src={Lock} alt="lock" style={{ marginRight: '10px' }} /> ფასის დაზღვევა</p>
                    </div>
                    <div className="buttons">
                        <div className="up">
                            <div className="shoppingbag">
                                <img src={Newcart} alt="" />
                            </div>
                            <button className='Buy'>ყიდვა</button>
                        </div>
                        <button className='Lower'> 
                            <span className="light">განვადებით ყიდვა</span>
                            <span className="dark"> 74 ლ - დან</span>
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




