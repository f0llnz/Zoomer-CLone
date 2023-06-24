import { useEffect, useState, useMemo } from 'react';
import ajax from '../../utils/ajax';
import { Link } from 'react-router-dom';

import Cart from '../../Pages/SingleItem/component/Imgs/Cart.svg';
import Left from './icons/left.svg'
import Right from './icons/right.svg'
import Edit from './icons/edit-button.svg'

import './HotSales.scss'
import { ListItems } from '../../@types/general';
import { addToCart } from '../../utils/cartSLice';
import { useDispatch } from 'react-redux';
import { useTranslation} from 'react-i18next'
import jwtDecode from 'jwt-decode';

export default function HotSales(): JSX.Element {
  const [products, setProducts] = useState<ListItems[]>([]);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([]);
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
  
  const openEditModal = (index: number) => {
    const product = products[index];
    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditImages(product.images);
    setEditingIndex(index);
  };

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

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<any>(token) : null;
  const isAdmin = decodedToken && decodedToken.isAdmin;

  return (
    <div className='HotItemsResp'>
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
                <span className="gray"> - {t("From")}</span>
              </p>
            </Link>
            {isAdmin &&
              <button className="editButton editbtn" onClick={() => openEditModal(index)}>
                <img src={Edit} alt="" width={20} />
              </button>
            }
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
            {editingIndex === index && (
              <div className="editModal">
                <h3>Edit Product</h3>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className='sss'
                />
                <input
                  type="text"
                  value={editPrice}
                  onChange={e => setEditPrice(Number(e.target.value))}
                  placeholder="Price"
                  className='sss'
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