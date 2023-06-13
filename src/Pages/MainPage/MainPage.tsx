import Navbar from '../../components/Navbar/Infobar/Infobar';
import Searchbar from '../../components/Navbar/Searchbar/Searchbar';
import CarouselZ from '../../components/Navbar/Carousel/Carousel';
import ListItem from '../../components/HotSales/HotSales';
import NewIcon from '../../components/Navbar/Images/online-bl.svg'

import './MainPage.scss';
import NewProducts from '../../components/NewProducts/NewProducts';

export default function MainPage() {
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
        <p>ახალი მოდელები</p>
      </div>
      <div className="newitems">
        <NewProducts />
      </div>
    </>
  );
}