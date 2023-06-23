import SearchBar from './component/Navbar2/SPSearchbar'
import ItemBody from './component/ItemBody/ItemBody'
import Infobar from '../../components/Navbar/Infobar/Infobar'
import TopProducts from '../../components/TopProducts/TopProducts'
import Footer from '../../components/Footer/Footer'
import { useTranslation} from 'react-i18next'

import Check from './component/Imgs/check.svg'

import './ChosenItem.scss'

export default function SingleItem() {
  const { t } = useTranslation(["common"])
    return(
        <div className="main">
            <Infobar />
            <SearchBar />
            <ItemBody />
            <div className="newproducts">
              <div className="smt">
                <img src={Check} alt="checkicon" width={20} />
              </div>
              <p>{t("SimiliarProducts")}</p>
            </div>
            <div className="topproducts">
              <TopProducts />
            </div>
            <Footer />
        </div>
    )
}