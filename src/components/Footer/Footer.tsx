import { useState } from "react"
import { useTranslation} from 'react-i18next'

import Fb from './imgs/fb.svg'
import Yt from './imgs/youtube.svg'
import Map from './imgs/footer_map.png'
import Geo from '../Navbar/Images/ge.png'
import down from './imgs/down.svg'
import text from './imgs/envelope.svg'
import phone from './imgs/phone-receiver.svg'

import './Footer.scss'

export default function Footer() {
    const { t } = useTranslation(["common"])
    const [barSearchText, setBarSearchText] = useState("")

    return(
    <div className="Footer">
        <div className="blueBar">
            <div className="innerBlueBar">
                <div className="dashoreba">
                    <input 
                    type="text"
                    placeholder={t("EnterEmail")}
                    value={barSearchText}
                    onChange={(e) => setBarSearchText(e.target.value)}
                    className="blueInput"
                    />
                    <div className="FbIcon">
                        <img src={Fb} alt="Fbicon" width={20} height={20} />
                    </div>
                    <div className="YtIcon">
                        <img src={Yt} alt="Yticon" width={20}/>
                    </div>
                </div>
                <div className="GeoFlag">
                    <div className="gleft">
                        <img src={Geo} alt="Geoflag" />
                        <p>GEO </p>
                    </div>
                    <img src={down} width={20} />
                </div>
            </div>
        </div>
        <div className="texts">
            <ul>
                <li><h3>{t("Navigation")}</h3></li>
                <li>{t("Aboutus")}</li>
                <li>{t("Vacancy")}</li>
            </ul>
            <ul>
                <li><h3>{t("Payments")}</h3></li>
                <li>{t("Paymentmethod")}</li>
                <li>{t("Warranty")}</li>
                <li>{t("Installment")}</li>
            </ul>
            <ul>
                <li><h3>{t("Myaccount")}</h3></li>
                <li>{t("Profile")}</li>
                <li>{t("Orders")}</li>
                <li>{t("Onlineinstallment")}</li>
                <li>{t("Returnitem")}</li>
                <li>Conditions of Use</li>
            </ul>
            <div className="contacts">
                <h3>{t("Contact")}</h3>
                <img src={Map} alt="" />
                <div className="number-emial">
                    <div className="email">
                        <img src={text} alt="emailicon" width={20}/>
                        <a href="">info@zoommer.ge</a>
                    </div>
                    <div className="number">
                        <img src={phone} alt="phoneicon" width={20}/>
                        <p>*7007 / +995 (32) 2 60 30 60</p>
                    </div>
                </div>
            </div>
        </div>
        <p className="Copyright">Copyright © 2023 Zoommer.ge. All rights reserved.</p>
    </div>
    )
}