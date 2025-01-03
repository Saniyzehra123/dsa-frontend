import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Ensure this file is in the same directory or adjust the path
import { useSelector } from 'react-redux';
import { persistor } from '../Redux/Store';
import {  useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState();
  const { isAuthenticated, loading, user } = useSelector((store) => store?.loginData);
  const navigate= useNavigate();

  // Add state for cart count
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    setLoginUser(data);
  };

  const handleLogout =()=>{
    if(loginUser?.id){
        sessionStorage.removeItem('userData'); // Clear session storage
        setLoginUser(null); // Reset the user state
        window.dispatchEvent(new Event('storage'));
        persistor.purge();
        navigate('/')
    }
}
  // useEffect(() => {
  //   alert("🚧 Website Under Maintenance 🚧\nThank you for your visit to D'Sa Fashion Wear & Home Décor! We're currently upgrading our site for a better shopping experience. Please check back soon! 🛍️✨");
  // }, []); // Empty dependency array means this runs once on mount


  const getCartItemCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('itemlist')) || [];
    // Count the number of distinct items in the cart
    const totalItems = cartItems.length;
    setCartCount(totalItems);
  };
  

  useEffect(() => {
    getLoginUser();
    getCartItemCount(); // Get the initial cart count when the component mounts
    // Listen for changes in localStorage
    window.addEventListener('storage', getCartItemCount);
    window.addEventListener('storage', getLoginUser);
    return () => {
      window.removeEventListener('storage',  getCartItemCount);
    };
  }, []);
  return (

    <div>
    <nav className="navbar fixed-top">
      <div className='logo ml-auto flex items-center py-3 text-3xl no-underline'>
        <a href="/">
          <img className='w-14 p2' src="/assets/images/logo/logo.jpg" alt="" />
        </a>
      </div>
  
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
          <a href="/">HOME</a>
          <a href="/comming-soon">NEW ARRIVALS</a>
          <a href="/saree">SAREE</a>

          <div className="dropdown-center">
            <a className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              LADIES BAG
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/comming-soon">Lather Bag</a></li>
              <li><a className="dropdown-item" href="/comming-soon">Cotton Bag</a></li>
            </ul>
          </div>
          <a href="/comming-soon">IMITATION JEWELLERY</a>

          <div className="dropdown-center">
            <a className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              LADIES SUIT
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/comming-soon">Kurti</a></li>
              <li><a className="dropdown-item" href="/comming-soon">Suit Length</a></li>
            </ul>
          </div>
          <a href="/about">ABOUT</a>
          <a href="/comming-soon">BLOGS</a>
          <a href="/contact">CONTACT</a>
        </div>

        <div className="nav-icons">
          {/* <a href="#"><i className="fas fa-search"></i></a> */}
          <div className="dropdown">
            <a type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FaRegUser />
            </a>
            <ul className="dropdown-menu">
              <li>
                {loginUser ? <a className="dropdown-item text-xs" onClick={handleLogout}>Logout</a> : <a className="dropdown-item text-xs" href="/login">Login</a>}
              </li>
              <li>
                {loginUser ? <a className="dropdown-item text-xs" onClick={()=>navigate('/user')}>Profile</a> : ''}
              </li>
              <li><a className="dropdown-item text-xs" href="/track-order">Track Orders</a></li>
            </ul>
          </div>
          <a href="/wishlist"><FaRegHeart /></a>
          
          {/* Cart Icon with Count */}
          <a href="/cart" className="cart-icon">
            <LuShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </a>
        </div>
      </div>
        
    </nav>
    </div>
  );
}