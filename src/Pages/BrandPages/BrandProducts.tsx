import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../SingleItem/component/Navbar2/SPSearchbar'
import Infobar from '../../components/Navbar/Infobar/Infobar'

interface Product {
  title: string;
  id: number;
  name: string;
  brand: string;
}

const BrandProducts: React.FC = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (brandName: string) => {
      try {
        const response = await axios.post(`http://localhost:8080/products`, {
          page_size: 10,
          page_number: 5,
          keyword: brandName,
        });

        let filteredProducts: Product[] = [];

        if (Array.isArray(response.data)) {
          filteredProducts = response.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          filteredProducts = response.data.products;
        }

        setProducts(filteredProducts);
        console.log(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (brand) {
      fetchProducts(brand);
    }
  }, [brand]);

  return (
    <div className="SelectedPage">
      <Infobar />
      <Navbar />
      <div>
        <h1>{brand} Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrandProducts;