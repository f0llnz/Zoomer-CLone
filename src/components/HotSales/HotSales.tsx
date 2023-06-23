import { useEffect, useState, useMemo } from 'react';
import ajax from '../../utils/ajax';
import { Link } from 'react-router-dom';

import Cart from '../../Pages/SingleItem/component/Imgs/Cart.svg';
import Left from './icons/left.svg'
import Right from './icons/right.svg'
import './HotSales.scss'
import { ListItems } from '../../@types/general';
import { addToCart } from '../../utils/cartSLice';
import { useDispatch } from 'react-redux';
import { useTranslation} from 'react-i18next'

export default function HotSales(): JSX.Element {
  const [products, setProducts] = useState<ListItems[]>([]);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([]);
  const { t } = useTranslation(["common"])

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.post('http://localhost:8080/products', {
          page_size: 10,
          page_number: 1,
          keyword: 'gaming',
        });

        const productItems: ListItems[] = response.data.products.map((product: any) => {
          return {
            images: product.images,
            title: product.title,
            price: product.price,
            id: product.id,
          };
        });

        setCurrentImageIndices(Array(productItems.length).fill(0));
        setProducts(productItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const randomNums = useMemo(() => {
    return products.map(() => Math.floor(Math.random() * 70) + 30);
  }, [products]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  }

  const goToNextImage = (index: number) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[index] = (newIndices[index] + 1) % products[index].images.length;
      return newIndices;
    });
  };

  const goToPreviousImage = (index: number) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      newIndices[index] = newIndices[index] === 0 ? products[index].images.length - 1 : newIndices[index] - 1;
      return newIndices;
    });
  };

  return (
    <div>
      {products.map((item, index) => {
        const randomNum = randomNums[index];

        return (
          <div className="ListItem" key={index}>
            <Link to={`/product/${item.id}`} key={index}>
              <div className="borangeb"></div>
              <div className="orangeb">ზუმერული ფასი</div>
              <img
                src={item.images[currentImageIndices[index]]}
                className="ItemPicture"
                alt="picture"
                width={120}
              />
              <h4 className="ItemTitle">{item.title}</h4>
              <div className="pricess">
                <p className="orangee">{Math.ceil(item.price)} ₾</p>
                <p className="grayy">{Math.ceil(item.price) - 10} ₾</p>
              </div>
              <p className="hr">
                <span className="orangeee">{randomNum} ₾</span>
                <span className="gray"> -{t(" From")}</span>
              </p>
            </Link>
            <div className="Tocart">
              <p className="Tocarttext">{t("Addtocart")}</p>
              <div className="carticon" onClick={() => handleAddToCart(item)}>
                <img src={Cart} alt="Cart" width={17} />
              </div>
            </div>
            <div className="ImageNavigation">
              <button className='leftt' onClick={() => goToPreviousImage(index)}><img src={Left} alt="LeftArrow" width={20}/></button>
              <button className='rightt' onClick={() => goToNextImage(index)}><img src={Right} alt="RightArrow" width={20}/></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}