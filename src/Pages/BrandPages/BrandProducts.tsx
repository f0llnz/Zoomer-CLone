import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Navbar from '../SingleItem/component/Navbar2/SPSearchbar';
import Infobar from '../../components/Navbar/Infobar/Infobar';

import { addToCart } from '../../utils/cartSLice';
import { ListItems } from '../../@types/general';
import { useTranslation} from 'react-i18next'

import Left from '../../components/HotSales/icons/left.svg'
import Right from '../../components/HotSales/icons/right.svg'
import Cart from '../../components/NewProducts/img/cart.svg';
import './BrandProducts.scss';
import Footer from '../../components/Footer/Footer';

const BrandProducts: React.FC = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState<{ item: ListItems, currentIndex: number, randomNum: number }[]>([]);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { t } = useTranslation(["common"])
  const dispatch = useDispatch();

  useEffect(() => {
    if (brand) {
      fetchProducts(brand, pageNumber, pageSize);
    }
  }, [brand, pageNumber, pageSize]);

  function RandomNum() {
    return Math.floor(Math.random() * 40) + 30;
  }

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const handleLoadMore = () => {
    const nextPage = pageNumber + 20;
    setPageNumber(nextPage);
    fetchProducts(brand ?? '', nextPage, pageSize);
  };

  const fetchProducts = async (brandName: string, page: number, size: number) => {
    try {
      const response = await axios.post(`http://localhost:8080/products`, {
        page_size: size,
        page_number: page,
        keyword: brandName,
      });

      let filteredProducts: ListItems[] = [];

      if (Array.isArray(response.data)) {
        filteredProducts = response.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        filteredProducts = response.data.products;
      }

      const updatedProducts = filteredProducts.map((item) => ({
        item,
        currentIndex: 0,
        randomNum: RandomNum(),
      }));

      setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
      setTotalItems(response.data.total_items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextImage = (index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].currentIndex = (updatedProducts[index].currentIndex + 1) % updatedProducts[index].item.images.length;
      return updatedProducts;
    });
  };

  const handlePreviousImage = (index: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const numImages = updatedProducts[index].item.images.length;
      updatedProducts[index].currentIndex = (updatedProducts[index].currentIndex - 1 + numImages) % numImages;
      return updatedProducts;
    });
  };

  return (
    <div>
      <Infobar />
      <Navbar />
      <div className="productandfilter">
        <div className="BrandProductsBody">
          {products.map((product, index) => {
            const { item, currentIndex, randomNum } = product;
            const RandomNumb = randomNum;

            return (
              <div className="NPBody Mako" key={index}>
                <Link to={`/product/${item.id}`}>
                  <div className="mainnpinfo">
                    <img
                      src={item.images[currentIndex]}
                      className="NPItemPicture"
                      alt="productpic"
                      width={150}
                    />
                    <h4 className="NPItemTitle titlee">{item.title}</h4>
                  </div>
                </Link>
                <div className="mainInfo maininfoo">
                  <div className="pricenpinfo">
                    <div className="top">
                      <p className="orangee darkblue">{Math.ceil(item.price)} ₾</p>
                    </div>
                    <p>
                      <span className="orangeee darkbluee">{RandomNumb} ₾</span>
                      <span className="gray"> -{t("From")}</span>
                    </p>
                  </div>
                  <div className="npiconss">
                    <div onClick={() => handleAddToCart(item)} className="firstone">
                      <img src={Cart} alt="cart" width={15} />
                    </div>
                  </div>
                </div>
                <div className="imageButtons">
                  <button className='leftt' onClick={() => handlePreviousImage(index)}><img src={Left} alt="LeftArrow" width={20}/></button>
                  <button className='rightt' onClick={() => handleNextImage(index)}><img src={Right} alt="RightArrow" width={20}/></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="more-button" onClick={handleLoadMore}>
        მეტი
      </button>
      <Footer />
    </div>
  );
};

export default BrandProducts;