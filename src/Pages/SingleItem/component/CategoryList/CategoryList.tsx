import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Samsung from './categoryIcons/samsung.png'
import Sony from './categoryIcons/sony.png'
import Redmi from './categoryIcons/redmi.png'
import Google from './categoryIcons/google.png'
import Dell from './categoryIcons/dell.png'
import Apple from './categoryIcons/apple.png'
import Acer from './categoryIcons/acer.png'

import './CategoryList.scss';



const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brand: string) => {
    navigate(`/brand/${brand}`);
  };
  
  return (
    <ul className='CategoryList'>
      <Link to="/brand/SAMSUNG" className='NavItem'><li onClick={() => handleBrandClick("SAMSUNG")}><span className='lii'><img src={Samsung} alt="samsung icon" width={25}/> სამსუნგი</span></li></Link>
      <Link to="/brand/apple" className='NavItem'><li onClick={() => handleBrandClick("apple")}><span className='lii'><img src={Apple} alt="apple icon" width={25}/> ეფლი</span></li></Link>
      <Link to="/brand/acer" className='NavItem'><li onClick={() => handleBrandClick("acer")}><span className='lii'><img src={Acer} alt="acer icon" width={25}/> ეისერი</span></li></Link>
      <Link to="/brand/dell" className='NavItem'> <li onClick={() => handleBrandClick("dell")}><span className='lii'><img src={Dell} alt="dell icon" width={25}/> დელი</span></li></Link>
      <Link to="/brand/google" className='NavItem'> <li onClick={() => handleBrandClick("google")}><span className='lii'><img src={Google} alt="google icon" width={25}/> გუგლი</span></li></Link>
      <Link to="/brand/redmi" className='NavItem'> <li onClick={() => handleBrandClick("redmi")}><span className='lii'><img src={Redmi} alt="redmi icon" width={25}/> რედმი</span></li></Link>
      <Link to="/brand/SONY" className='NavItem'><li onClick={() => handleBrandClick("SONY")}><span className='lii'><img src={Sony} alt="sony icon" width={25}/> სონი</span></li></Link>
    </ul>
  );
};

export default CategoryList;