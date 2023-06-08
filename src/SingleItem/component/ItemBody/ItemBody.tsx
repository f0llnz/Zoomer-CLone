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

export default function ItemBody(){
    return(
        <div className="ChosenItem">
            <div className="itembody">
                <div className="product-img">
                <img src={FirstPic} className='ImgIcon' alt="phonepic" width={350}/>
                <div className="underimages">
                    <img src={FirstPic} alt="FirstPic" width={70} className='piC Y' />
                    <img src={SecondPic} alt="FirstPic" width={70} className='piC' />
                    <img src={ThirdPic} alt="FirstPic" width={70} className='piC' />
                </div>
                </div>
                <div className="productinfo">
                    <div className="generalname">
                        <div className="firstthree">
                            <img src={AppleIcon} alt="Apple" width={30}/>
                            <p>Apple</p>
                            <h6>#ZOOM-028810</h6>
                        </div>
                        <h3>Apple iPhone 14 | 128GB Blue</h3>
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
                    </div>
                </div>
            </div>
            <div className="Sale">
                <div className="price">
                    <div className="priceinfo">
                        <p className='Original'>2 499 ₾</p>
                        <p className='Now'>2 349 ₾</p>
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