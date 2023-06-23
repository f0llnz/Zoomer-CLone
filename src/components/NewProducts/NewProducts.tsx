import { ListItems } from '../../@types/general';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ajax from '../../utils/ajax';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utils/cartSLice';

import Cart from './img/cart.svg';
import Compare from './img/compare_white.svg';
import Left from '../HotSales/icons/left.svg'
import Right from '../HotSales/icons/right.svg'

import './NewProducts.scss';

interface ImageState {
  currentImage: number;
  randomNum: number;
}

export default function NewProducts(): JSX.Element {
  const [products, setProducts] = useState<ListItems[]>([]);
  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.post('http://localhost:8080/products', {
          page_size: 4,
          page_number: 55,
          keyword: 'laptop',
        });

        const productItems: ListItems[] = response.data.products.map((product: any) => {
          return {
            images: product.images,
            title: product.title,
            price: product.price,
            id: product.id,
          };
        });

        setProducts(productItems);
        setImageStates(
          productItems.map(() => ({
            currentImage: 0,
            randomNum: Math.floor(Math.random() * 70) + 30,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const goToPreviousImage = (itemIndex: number) => {
    setImageStates((prevState) => {
      const updatedStates = [...prevState];
      if (updatedStates[itemIndex].currentImage === 0) {
        updatedStates[itemIndex].currentImage = products[itemIndex].images.length - 1;
      } else {
        updatedStates[itemIndex].currentImage -= 1;
      }
      return updatedStates;
    });
  };

  const goToNextImage = (itemIndex: number) => {
    setImageStates((prevState) => {
      const updatedStates = [...prevState];
      if (updatedStates[itemIndex].currentImage === products[itemIndex].images.length - 1) {
        updatedStates[itemIndex].currentImage = 0;
      } else {
        updatedStates[itemIndex].currentImage += 1;
      }
      return updatedStates;
    });
  };

  const getRandomNum = useMemo(() => {
    return (itemIndex: number) => {
      return imageStates[itemIndex].randomNum;
    };
  }, [imageStates]);

  return (
    <div>
      {products.map((item, index) => {
        const currentImage = imageStates[index].currentImage;
        const randomNum = getRandomNum(index);

        return (
          <div className="NPBody" key={index}>
            <Link to={`/product/${item.id}`}>
              <div className="mainnpinfo">
                <div className="borangeb"></div>
                <div className="orangeb">New</div>
                <img
                  src={item.images[currentImage]}
                  className="NPItemPicture"
                  alt="productpic"
                  width={150}
                />
                <h4 className="NPItemTitle">{item.title}</h4>
              </div>
            </Link>
            <div className="mainInfo">
              <div className="pricenpinfo">
                <div className="top">
                  <p className="orangee">{Math.ceil(item.price)} ₾</p>
                  <p className="grayy">{Math.ceil(item.price) - 10} ₾</p>
                </div>
                <p>
                  <span className="gray">თვეში </span>
                  <span className="orangeee">{randomNum} ₾</span>
                  <span className="gray"> -დან</span>
                </p>
              </div>
              <div className="npicons">
                <div onClick={() => handleAddToCart(item)} className="firstone">
                  <img src={Cart} alt="cart" width={15} />
                </div>
                <div className="firstone">
                  <img src={Compare} alt="compare" width={15} />
                </div>
              </div>
            </div>
            <div className="image-navigation">
              <button className='leftt' onClick={() => goToPreviousImage(index)}><img src={Left} alt="LeftArrow" width={20}/></button>
              <button className='rightt' onClick={() => goToNextImage(index)}><img src={Right} alt="RightArrow" width={20}/></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}