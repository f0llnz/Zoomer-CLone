import { useState, useEffect } from 'react';
import SearchI from '../../../Pages/SingleItem/component/Imgs/search.png';
import './SearchbarI.scss';
import { ListItems } from '../../../@types/general';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Searchbar() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<ListItems[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ListItems[]>([]);
  const { t } = useTranslation(['common']);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchText, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: '',
          page_size: 10000,
          page_number: 0,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchText?.toLowerCase() ?? '')
    );
    if (searchText === '') {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="Searchbody">
      <div className="searchbar">
        <input
          className="searchinput"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={t('Searchstore')}
        />
        <img src={SearchI} width={20} height={20} alt="SearchIcon" className="loop" />
      </div>
      {filteredProducts.length > 0 && (
        <div className="SearchItems">
          <ul>
            {filteredProducts.slice(0, 15).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <li key={product.id}>
                  <div className="searcheditems">
                    <img src={product.images[0]} alt="img" width={50} />
                    <div className="title">{product.title}</div>
                    <div className="searchprice">{product.price}</div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}