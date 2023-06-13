import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../../Pages/SingleItem/component/Imgs/Cart.svg';

import './HotSales.scss'
import { ListItems } from '../../@types/general';

export default function HotSales(): JSX.Element {
  const [products, setProducts] = useState<ListItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/products', {
          page_size: 10,
          page_number: 1,
          keyword: 'gaming',
        });

        const productItems: ListItems[] = response.data.products.map((product: any) => {
          return {
            images: product.images,
            title: product.title,
            price: product.price,
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

  return (
    <div>
      {products.map((item, index) => {
        const RandomNumb = RandomNum();

        return (
          <div className="ListItem" key={index}>
            <div className="borangeb"></div>
            <div className="orangeb">ზუმერული ფასი</div>
            <img src={item.images[0]} className="ItemPicture" alt="picture" width={150} />
            <h4 className="ItemTitle">{item.title}</h4>
            <div className="pricess">
              <p className="orangee">{Math.ceil(item.price)} ₾</p>
              <p className="grayy">{Math.ceil(item.price) - 10} ₾</p>
            </div>
            <p className="hr">
              <span className="orangeee">{RandomNumb} ₾</span>
              <span className="gray"> -დან</span>
            </p>
            <div className="Tocart">
              <p className="Tocarttext">დაამატე კალათაში</p>
              <div className="carticon">
                <img src={Cart} alt="Cart" width={17} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}