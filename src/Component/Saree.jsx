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
  const sarees = useSelector((store) => store.saree?.sarees);
  const [loginUser, setLoginUser] = useState();

  // Wishlist state will be initialized from localStorage
  const [liked, setLiked] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const getLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    setLoginUser(data);
  };

  useEffect(() => {
    dispatch(GetSarees()); // Fetch sarees data on component mount
    // getLoginUser();
  }, [dispatch]);

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
      saree_name: item.saree_name,
      price: item.price,
      color: item.color_name,
      image: item.main_image_url,
       }];
       toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={item.main_image_url}
            alt={item.saree_name}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <div>
            <strong>{item.saree_name}</strong> added to wishlist!
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
      saree_name: saree.saree_name,
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

  return (
    <div className="container mt-36">
      {/* Banner Image */}
      <div className="row">
        <div className="col-md-12">
          <img src="assets/images/carousel/c1.jpeg" alt="Banner" className="banner-image" />
        </div>
      </div>
      <br />

      <div className="row">
        {/* Left Side Filter */}
        <div className="col-md-2">
          <h4>Filter</h4>
          <hr />
          <div className="filter-group">
            <label>Availability:</label>
            <select>
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Out Of Stock">Out Of Stock</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Price:</label>
            <select>
              <option value="low">Low To High</option>
              <option value="high">High To Low</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category:</label>
            <select>
              <option value="All">All</option>
              <option value="Cotton Silk">Cotton Silk</option>
              <option value="Katan Silk">Katan Silk</option>
              <option value="Silk">Silk</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Occasion:</label>
            <select>
              <option value="All">All</option>
              <option value="Festivals">Festivals</option>
              <option value="Wedding">Wedding</option>
              <option value="Party Wear">Party Wear</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Weave Type:</label>
            <select>
              <option value="All">All</option>
              <option value="Satin">Satin</option>
              <option value="Zari - Golden & Copper">Zari - Golden & Copper</option>
              <option value="Pathani">Pathani</option>
              <option value="Banarasi">Banarasi</option>
            </select>
          </div>
        </div>

        {/* Right Side Product Cards */}
        <div className="col-md-10">
          <h1>OUR SAREE COLLECTION</h1>
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((saree, index) => (
                <div className="col-md-4" key={saree.item_id}>
                  <div className="card">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Link to={`/product-details/${saree.item_id}`} className="image-container">
                        <img
                          src={saree.main_image_url || placeholder }
                          alt={saree.saree_name}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Link>
                      {/* Heart icon container */}
                      <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 2 }}>
                        {/* <a onClick={() => toggleHeart(saree)}>
                            {isLiked(saree) ? <FaHeart color="red" /> : <FaRegHeart />}
                          </a> */}
                      </div>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{saree.saree_name}</h5>
                      <p className="card-text">({saree.color_name}, {saree.fabric_type_name})</p>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="card-text">
                          <b className="text-danger">₹{saree.price}</b>&nbsp;
                          <s className="text-muted">₹{(saree.price * 1.14).toFixed(2)}</s>&nbsp;
                          <span className="text-success">(14% Off)</span>
                        </p>
                        <a href="#">
                          <p className="rating">{saree.rating} &nbsp;<i className="fa fa-star"></i></p>
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
