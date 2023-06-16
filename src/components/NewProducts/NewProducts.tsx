import { ListItems } from '../../@types/general';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ajax from '../../utils/ajax';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utils/cartSLice';

import Cart from './img/cart.svg'
import Compare from './img/compare_white.svg'

import './NewProducts.scss'

export default function NewProducts(): JSX.Element{
    const [products, setProducts] = useState<ListItems[]>([])

    const dispatch = useDispatch();

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajax.post('http://localhost:8080/products', {
          page_size: 4,
          page_number:55,
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function RandomNum() {
    return Math.floor(Math.random() * 70) + 30;
  }

  const handleAddToCart = (product:any) => {
    dispatch(addToCart(product))
  }

  return (
    <div>
      {products.map((item, index) => {
        const RandomNumb = RandomNum();

        return (
              <div  className="NPBody"  key={index}>
              <Link to={`/product/${item.id}`}>
                <div className="mainnpinfo">
                    <div className="borangeb"></div>
                    <div className="orangeb">New</div>
                    <img src={item.images[0]} className='NPItemPicture' alt="productpic" width={150} />
                    <h4 className='NPItemTitle'>{item.title}</h4>
                </div>
              </Link>
                <div className="mainInfo">
                  <div className="pricenpinfo">
                    <div className="top">
                      <p className='orangee'>{Math.ceil(item.price)} ₾</p>
                      <p className='grayy'>{Math.ceil(item.price) - 10} ₾</p>
                    </div>
                      <p>
                          <span className='gray'>თვეში </span>
                          <span className='orangeee'>{RandomNumb} ₾</span>
                          <span className='gray'> -დან</span>
                      </p>
                  </div>
                  <div className="npicons">
                      <div onClick={() => handleAddToCart(item)} className="firstone">
                          <img src={Cart} alt="cart" width={15} />
                      </div>
                      <div className="firstone">
                          <img src={Compare} alt="compare" width={15}/>
                      </div>
                  </div>
                </div>
            </div>
            );
        })}
    </div>
  );
}

 