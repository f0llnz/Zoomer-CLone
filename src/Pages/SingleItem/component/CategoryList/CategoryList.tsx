import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.scss';


const CategoryList: React.FC = () => {
  return (
    <ul className='CategoryList'>
      <Link to="/brands/SAMSUNG" className='NavItem'><li className='lii'>სამსუნგი</li></Link>
      <Link to="/brands/apple" className='NavItem'><li className='lii'>ეფლი</li></Link>
      <Link to="/brands/acer" className='NavItem'><li className='lii'>ეისერი</li></Link>
      <Link to="/brands/dell" className='NavItem'><li className='lii'>დელი</li></Link>
      <Link to="/brands/google" className='NavItem'><li className='lii'>გუგლი</li></Link>
      <Link to="/brands/redmi" className='NavItem'><li className='lii'>რედმი</li></Link>
      <Link to="/brands/SONY" className='NavItem'><li className='lii'>სონი</li></Link>
    </ul>
  );
};

export default CategoryList;