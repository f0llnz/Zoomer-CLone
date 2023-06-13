import {Link} from 'react-router-dom'

import './CategoryList.scss'

export default function CategoryList() {
    return(
        <ul className='CategoryList'>
            <li><Link to="/detailed" className='NavItem'>ტელეფონი</Link></li>
            <li><Link to=" " className='NavItem'>კომპიუტერები</Link></li>
            <li><Link to=" " className='NavItem'>ყურსასმენები</Link></li>
            <li><Link to=" " className='NavItem'>აუდიო სისტემა</Link></li>
            <li><Link to=" " className='NavItem'>ტელევიზორი</Link></li>
            <li><Link to=" " className='NavItem'>გეიმინგი</Link></li>
            <li><Link to=" " className='NavItem'>ფოტო | ვიდეო | ტექნიკა</Link></li>
        </ul>
    )
}