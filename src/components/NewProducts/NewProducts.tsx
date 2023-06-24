import { ListItems } from '../../@types/general';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ajax from '../../utils/ajax';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../utils/cartSLice';
import { useTranslation} from 'react-i18next'

import Cart from './img/cart.svg';
import Compare from './img/compare_white.svg';
import Left from '../HotSales/icons/left.svg'
import Right from '../HotSales/icons/right.svg'
import Edit from '../HotSales/icons/edit-button.svg'

import './NewProducts.scss';
import jwtDecode from 'jwt-decode';

interface ImageState {
  currentImage: number;
  randomNum: number;
}

export default function NewProducts(): JSX.Element {
  const [products, setProducts] = useState<ListItems[]>([]);
  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { t } = useTranslation(["common"])
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

  const saveProductChanges = async () => {
    if (editingIndex !== null) {
      const editedProduct = {
        id: products[editingIndex].id,
        title: editTitle,
        price: editPrice,
        images: editImages,
      };
  
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
  
        await ajax.put(`http://localhost:8080/product/${editedProduct.id}`, editedProduct, config);
  
        setProducts(prevProducts => {
          const updatedProducts = [...prevProducts];
          updatedProducts[editingIndex] = editedProduct;
          return updatedProducts;
        });
  
        setEditTitle('');
        setEditPrice(0);
        setEditImages([]);
        setEditingIndex(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openEditModal = (index: number) => {
    const product = products[index];
    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditImages(product.images);
    setEditingIndex(index);
  };

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<any>(token) : null;
  const isAdmin = decodedToken && decodedToken.isAdmin;

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
            {isAdmin &&
              <button className="editButtton" onClick={() => openEditModal(index)}>
                <img src={Edit} alt="" width={20} />
              </button>
            }
            <div className="mainInfo">
              <div className="pricenpinfo">
                <div className="top">
                  <p className="orangee">{Math.ceil(item.price)} ₾</p>
                  <p className="grayy">{Math.ceil(item.price) - 10} ₾</p>
                </div>
                <p>
                  <span className="gray">{t("Monthly")} </span>
                  <span className="orangeee">{randomNum} ₾</span>
                  <span className="gray"> - {t("From")}</span>
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
            {editingIndex === index && (
              <div className="editModal">
                <h3>Edit Product</h3>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editPrice}
                  onChange={e => setEditPrice(Number(e.target.value))}
                  placeholder="Price"
                />
                <div className="ModalBtns">
                  <button onClick={saveProductChanges}>Save</button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}