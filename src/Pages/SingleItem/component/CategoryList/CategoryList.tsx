import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CategoryList.scss';


const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brand: string) => {
    navigate(`/brand/${brand}`);
  };
  
  return (
    <ul className='CategoryList'>
      <Link to="/brand/SAMSUNG" className='NavItem'><li onClick={() => handleBrandClick("SAMSUNG")}><span className='lii'>სამსუნგი</span></li></Link>
      <Link to="/brand/apple" className='NavItem'><li onClick={() => handleBrandClick("apple")}><span className='lii'>ეფლი</span></li></Link>
      <Link to="/brand/acer" className='NavItem'><li onClick={() => handleBrandClick("acer")}><span className='lii'>ეისერი</span></li></Link>
      <Link to="/brand/dell" className='NavItem'> <li onClick={() => handleBrandClick("dell")}><span className='lii'>დელი</span></li></Link>
      <Link to="/brand/google" className='NavItem'> <li onClick={() => handleBrandClick("google")}><span className='lii'>გუგლი</span></li></Link>
      <Link to="/brand/redmi" className='NavItem'> <li onClick={() => handleBrandClick("redmi")}><span className='lii'>რედმი</span></li></Link>
      <Link to="/brand/SONY" className='NavItem'><li onClick={() => handleBrandClick("SONY")}><span className='lii'>სონი</span></li></Link>
    </ul>
  );
};

export default CategoryList;