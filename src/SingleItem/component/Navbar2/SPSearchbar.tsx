import ZLogo from '../Imgs/logo.svg'
import SearchI from '../Imgs/search.png'
import ProfileP from '../Imgs/profile.svg'
import CartI from '../Imgs/Cart.svg'
import List from '../Imgs/List.svg'

import './SPSearchbar.scss'
import { Link } from 'react-router-dom'

export default function SPSearchbar() {
    return(
        <div className="Main">
            <div className="navColumn">   
                <img src={ZLogo} width={169} height={70} alt="Zoomer Logo" />
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
                    <div className="cart inner">
                        <img src={CartI} alt="Cart Icon"  width={20} height={20}/>
                        <p>0ლ</p>
                    </div>
                </div>
            </div>

            <div className="Nav">
                <div className="blue">
                    <img src={List} alt="ListIcon" width={20} height={20}/>
                    <p className='WNav'>ნავიგაცია</p>
                </div>
                <div className="orange">
                    <ul>
                        <li><Link to='/'>მთავარი</Link></li>
                        <li>კატეგორია</li>
                        <li>ბრენდი</li>
                        <li>სახელი</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}