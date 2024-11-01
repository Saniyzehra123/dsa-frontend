import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetSarees } from '../Redux/Sarees/sareeAction';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Correct import for icons
import 'react-toastify/dist/ReactToastify.css'; 
import  placeholder from '../assets/placeholder.jpg'
import { toast, ToastContainer } from 'react-toastify';

export default function Saree() {
  const dispatch = useDispatch();
  const sarees = useSelector((store) => store?.saree?.sarees);
  const [loginUser, setLoginUser] = useState();
  const [sortBy, setSortOrder] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [occasion, setOccasion] = useState('');
  const [weaveType, setWeaveType] = useState('');

  // Wishlist state will be initialized from localStorage
  const [liked, setLiked] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });


    // State to manage dropdown visibility
    const [dropdowns, setDropdowns] = useState({
      availability: false,
      category: false,
      occasion: false,
      weaveType: false,
    });
    
    
  const getLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    setLoginUser(data);
  };

  // useEffect(() => {
  //   dispatch(GetSarees()); 
  // }, [dispatch]);
  useEffect(() => {
    const payload = {
      color,
      minPrice,
      maxPrice,
      fabricType,
      occasion,
      weaveType,
      sortBy,
      page: 1, // Assume you're fetching the first page for simplicity
      limit: 10
    };
    dispatch(GetSarees(payload)); 
  }, [color, minPrice, maxPrice, fabricType, occasion, weaveType, sortBy]);

  // Sync with the Redux state when the sarees data is updated
  useEffect(() => {
    if (sarees?.data?.length) {
      setLiked((prevLiked) => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : prevLiked;
      });
    }
  }, [sarees]);

  // Add or remove items from wishlist
  const toggleHeart = (item) => {
    const itemIndex = liked.findIndex((likedItem) => likedItem.id === item.item_id);
    let updatedLiked;
    if (itemIndex !== -1) {
      // Item is already in the wishlist, remove it
      updatedLiked = liked.filter((likedItem) => likedItem.id !== item.item_id);
      toast.warn('Product removed from wishlist!', {
        position: 'top-right',
        autoClose: 2000,
      });
    }else {
      // Add item to wishlist
      updatedLiked = [...liked, { 
      id: item.item_id,
      title: item.title,
      price: item.price,
      color: item.color_name,
      image: item.main_image_url,
       }];
       toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={item.main_image_url}
            alt={item.title}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
          <div>
            <strong>{item.title}</strong> added to wishlist!
          </div>
        </div>,
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    }

    setLiked(updatedLiked);
    localStorage.setItem('wishlist', JSON.stringify(updatedLiked)); // Update localStorage
  };

  // Updated addToCart function
  const addToCart = (saree) => {
    const cartList = {
      id: saree.item_id,
      title: saree.title,
      price: saree.price,
      quantity: 1, // Default quantity can be set to 1
      main_image_url: saree.main_image_url,
      customer_id: loginUser?.id || ''
    };

    let updatedCartList = JSON.parse(localStorage.getItem('itemlist')) || [];
    const existingItemIndex = updatedCartList.findIndex((cartItem) => cartItem.id === cartList.id);

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, show a toast notification
      toast.warn('This product is already in your cart!', {
        position: 'top-right', // Use 'top-right' directly instead of toast.POSITION.TOP_RIGHT
        autoClose: 2000,
      });
    } else {
      // Add the product to the cart
      updatedCartList.push({ ...cartList, count: 1 });
      localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
      window.dispatchEvent(new Event('storage'));
      // Show a success toast notification
      toast.success('Product added to cart!', {
        position: 'top-right', // Use 'top-right' directly
        autoClose: 2000,
      });
    }
  };

  // Check if the item is in the wishlist
  const isLiked = (item) => liked.some((likedItem) => likedItem.id === item.item_id);

  // Filter and sort products based on selected criteria
  const filteredProducts = sarees?.data || [];

  // Toggle dropdown visibility
  const toggleDropdown = (type) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="container mt-36">
      {/* Banner Image */}
      <div className="container mt-36">
        <div className="row">
          <div className="col-md-12">
            <img src="assets/images/carousel/c1.jpeg" alt="" />
          </div>
        </div>
      </div>
      <br /><br />

      <div className="row">
        {/* Left Side Filter */}
        <div className="col-md-2">
          <h4>Filter</h4>
          <hr />
          {/* Availability Filter */}
          <div className="filter-group">
            <label>Availability:</label>
            <button className="dropbtn" onClick={() => toggleDropdown('availability')}>
              {dropdowns.availability ? 'Hide Options' : 'Select Availability'}
            </button>
            {dropdowns.availability && (
              <div className="dropdown-content">
                <label>
                  All <input type="checkbox" onChange={() => ('All')} />
                </label>
                <label>
                  In Stock <input type="checkbox" onChange={() => ('In Stock')} />
                </label>
                <label>
                  Out Of Stock <input type="checkbox" onChange={() => ('Out Of Stock')} />
                </label>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label>Category:</label>
            <button className="dropbtn" onClick={() => toggleDropdown('category')}>
              {dropdowns.category ? 'Hide Options' : 'Select Category'}
            </button>
            {dropdowns.category && (
              <div className="dropdown-content">
                <label>
                  All <input type="checkbox" onChange={() => ('All')} />
                </label>
                <label>
                  Cotton Silk  <input type="checkbox" onChange={() => ('Cotton Silk')} />
                </label>
                <label>
                  Katan Silk <input type="checkbox" onChange={() => ('Katan Silk')} />
                </label>
                <label>
                  Silk  <input type="checkbox" onChange={() => ('Silk')} />
                </label>
              </div>
            )}
          </div>

          {/* Occasion Filter */}
          <div className="filter-group">
            <label>Occasion:</label>
            <button className="dropbtn" onClick={() => toggleDropdown('occasion')}>
              {dropdowns.occasion ? 'Hide Options' : 'Select Occasion'}
            </button>
            {dropdowns.occasion && (
              <div className="dropdown-content">
                <label>
                  All  <input type="checkbox" onChange={() => ('All')} />
                </label>
                <label>
                  Festivals <input type="checkbox" onChange={() => ('Festivals')} />
                </label>
                <label>
                  Wedding  <input type="checkbox" onChange={() => ('Wedding')} />
                </label>
                <label>
                  Party Wear  <input type="checkbox" onChange={() => ('Party Wear')} />
                </label>
              </div>
            )}
          </div>

          {/* Weave Type Filter */}
          <div className="filter-group">
            <label>Weave Type:</label>
            <button className="dropbtn" onClick={() => toggleDropdown('weaveType')}>
              {dropdowns.weaveType ? 'Hide Options' : 'Select Weave Type'}
            </button>
            {dropdowns.weaveType && (
              <div className="dropdown-content">
                <label>
                  All <input type="checkbox" onChange={() => ('All')} />
                </label>
                <label>
                  Satin  <input type="checkbox" onChange={() => ('Satin')} />
                </label>
                <label> Zari - Golden & Copper  <input type="checkbox" onChange={() => ('Zari - Golden & Copper')} />
                </label>
                <label>
                  Pathani  <input type="checkbox" onChange={() => ('Pathani')} />
                </label>
                <label>
                  Banarasi  <input type="checkbox" onChange={() => ('Banarasi')} />
                </label>
              </div>
            )}
          </div>
          </div>

        {/* Right Side Product Cards */}
        <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center">
            <h1>OUR SAREE COLLECTION</h1>
            <div className="sort-dropdown" style={{ marginLeft: 'auto' }}>
              <label>Sort By:</label>
              {/* <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select> */}
              <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Select Sort</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>


           
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((saree, index) => (
                <div className="col-md-4" key={saree.item_id}>
                  <div className="card">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Link to={`/product-details/${saree.item_id}`} className="image-container">
                        <img
                          src={saree.main_image_url || placeholder }
                          alt={saree.title}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Link>
                      {/* Heart icon container */}
                      <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                        <a onClick={() => toggleHeart(saree)}>
                          {isLiked(saree) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </a>
                      </div>
                    </div>

                    <div className="card-body text-center">
                      <h5 className="card-title">{saree.title}</h5>
                      <p className="card-text">{saree.color_name}</p>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="card-text">
                          <b className="text-danger">₹{saree.price}</b>&nbsp;
                          <s className="text-muted">₹{(saree.price * 1.14).toFixed(2)}</s>&nbsp;
                          <span className="text-success">(14% Off)</span>
                        </p>
                        <a href="#">
                          <p className="rating">4.4 &nbsp;<i className="fa fa-star"></i></p>
                        </a>
                      </li>
                    </ul>
                    <div className="card-body">
                      <button className="button-28" onClick={()=>addToCart(saree)}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No sarees available</p>
            )}
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div>

      <style jsx>
        {`
          .col-md-3 {
            margin-bottom: 20px;
          }

          .filter-group {
            margin-bottom: 20px;
          }

          .filter-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }

          .filter-group select {
            width: 100%;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: #fff;
          }

          .card {
            margin: 10px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .card img {
            margin-bottom: 15px;
          }

          .card-body {
            padding: 10px 0;
          }

          .list-group-item {
            padding: 10px;
          }

          .button-28 {
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
}




