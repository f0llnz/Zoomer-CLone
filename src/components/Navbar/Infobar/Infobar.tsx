import PhoneImg from '../Images/PhoneImg.svg'
import Geo from '../Images/ge.png'
import Arrow from '../Images/arrow.png'
import "./Infobar.scss"

function Navbar() {

    return(
        <nav>
            <div className='left'>
                <img src={PhoneImg} width={20} height={20}/>
                <p className='gray'>ცხელი ხაზი</p>
                <p className="red">*7007 / +995 (32) 2 60 30 60</p>
            </div>
            <div className='right'>
                <p className='gray'>ონლაინ განვადება</p>
                <p className='gray'>ფილიალები</p>
                <p className='red'>ყველა აქცია</p>
                <div className="language">
                    <img src={Geo} alt="GEO" />
                    <p className='geo'>GEO</p>
                    <img src={Arrow} width={15} alt="arrow" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;