import Navbar from '../../components/Navbar/Infobar/Infobar';
import Searchbar from '../../components/Navbar/Searchbar/Searchbar';
import CarouselZ from '../../components/Navbar/Carousel/Carousel';
import ListItem from '../../components/HotSales/HotSales';
import NewIcon from '../../components/Navbar/Images/online-bl.svg'
import Star from '../SingleItem/component/Imgs/star.svg'
import Check from '../SingleItem/component/Imgs/check.svg'

import './MainPage.scss';
import { useTranslation} from 'react-i18next'

import NewProducts from '../../components/NewProducts/NewProducts';
import Footer from '../../components/Footer/Footer';
import PopularProducts from '../../components/PopularProducts/PopularProducts';
import TopProducts from '../../components/TopProducts/TopProducts';

export default function MainPage() {
  const { t } = useTranslation(["common"])
  return (
    <>
      <Navbar />
      <Searchbar />
      <CarouselZ />
      <div className="hotitems">
        <ListItem />
      </div>

      <div className="newproducts">
        <div className="smt">
          <img src={NewIcon} alt="NewIcon" width={20} />
        </div>
        <p>{t("Newmodels")}</p>
      </div>
      <div className="newitems">
        <NewProducts />
      </div>

      <div className="newproducts">
          <div className="smt">
            <img src={Star} alt="staricon" width={20} />
          </div>
          <p>{t("Popular")}</p>
      </div>
      <div className="popularitems">
        <PopularProducts />
      </div>

      <div className="newproducts">
          <div className="smt">
            <img src={Check} alt="checkicon" width={20} />
          </div>
          <p>{t("Topproducts")}</p>
      </div>
      <div className="topproducts">
        <TopProducts />
      </div>
      <Footer />
    </>
  );
}