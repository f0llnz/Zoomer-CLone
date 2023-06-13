import ZLogo from './icons/logo.svg'
import SearchI from '../Images/search.png'
import ProfileP from './icons/profile.svg'
import CartI from './icons/cart.svg'
import List from '../Searchbar/icons/list.svg'

import {Link} from 'react-router-dom'

import './Searchbar.scss'

function Searchbar() {
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
                            <Link to="/phones" className='NavItem'><li>ტელეფონი</li></Link>
                            <Link to="/computers" className='NavItem'><li>კომპიუტერები</li></Link>
                            <Link to="/headphones" className='NavItem'><li>ყურსასმენები</li></Link>
                            <Link to="/audio-system" className='NavItem'><li>აუდიო სისტემა</li></Link>
                            <Link to="/television" className='NavItem'><li>ტელევიზორი</li></Link>
                            <Link to="/gaming" className='NavItem'><li>გეიმინგი</li></Link>
                            <Link to="/photo-video-technic" className='NavItem'><li>ფოტო | ვიდეო | ტექნიკა</li></Link>
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
        </div>
    )
}

export default Searchbar;