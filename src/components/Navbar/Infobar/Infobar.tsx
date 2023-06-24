import PhoneImg from '../Images/PhoneImg.svg';
import Geo from '../Images/ge.png';
import Eng from '../Images/en.jpg';
import Arrow from '../Images/arrow.png';
import "./Infobar.scss";

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import i18next from 'i18next';

function Navbar() {
  const { t } = useTranslation(["common"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length! > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLangChange = (e: any) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <nav className='Infobarr'>
      <div className="left">
        <img src={PhoneImg} width={20} height={20} alt="Phone" />
        <p className="gray">{t("Hotline")}</p>
        <p className="red">*7007 / +995 (32) 2 60 30 60</p>
      </div>
      <div className="right">
        <p className="gray">{t("Onlineinstallment")}</p>
        <p className="gray">{t("Branches")}</p>
        <p className="red">{t("Allpromotions")}</p>
        <select
          className="language"
          value={localStorage.getItem("i18nextLng") ?? ""}
          onChange={handleLangChange}
        > 
          <option value="ge">
            GEO
          </option>
          <option value="en">
            ENG
          </option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;