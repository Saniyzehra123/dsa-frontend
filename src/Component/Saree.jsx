import React, { useEffect, useState } from 'react';
import './Saree.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetSarees } from '../Redux/Sarees/sareeAction';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Correct import for icons
import 'react-toastify/dist/ReactToastify.css'; 
import  placeholder from '../assets/placeholder.jpg'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Saree() {
  const dispatch = useDispatch();
  const sarees = useSelector((store) => store?.saree?.sarees);
  const [loginUser, setLoginUser] = useState();
  const [sortBy, setSortOrder] = useState('');
 
  // const [minPrice, setMinPrice] = useState('');
  // const [maxPrice, setMaxPrice] = useState('');
  const [sareeTypes, setSareeTypes] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [weaveTypes, setWeaveTypes] = useState([]);
  const [colors, setColors] = useState([]);

  const [filters, setFilters] = useState({
    color:[],
    minPrice: '',
    maxPrice: '',
    sareeType: [],
    occasion: [],
    weaveType:[]
  });

  // Wishlist state will be initialized from localStorage
  const [liked, setLiked] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });


    // State to manage dropdown visibility
    const [dropdowns, setDropdowns] = useState({
      availability: false,
      fabric: false,
      occasion: false,
      weaveType: false,
      color:false
    });
    
    
  const getLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    setLoginUser(data);
  };

  const fetchSareeTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/adminitem/saree`);
      let data = await response.data?.data;
      console.log("get saretype:", data);
      setSareeTypes(data); // Assuming response contains an array of saree types
    } catch (error) {
      console.error('Error fetching saree types:', error);
    }
  };

  const fetchOccasions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/adminitem/ocassion`);
      let data = await response.data?.data;
      console.log("get ocasion:", data);
      setOccasions(data); // Assuming response contains an array of occasions
    } catch (error) {
      console.error('Error fetching occasions:', error);
    }
  };

  const fetchWeaveTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/adminitem/weave`);
      let data = await response.data?.data;
      console.log("get weave:", data);
      setWeaveTypes(data); // Assuming response contains an array of weave types
    } catch (error) {
      console.error('Error fetching weave types:', error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/adminitem/color`);
      let data = await response.data?.data;
      console.log("get color:", data);
      setColors(data); // Assuming response contains an array of colors
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  useEffect(() => {
    fetchSareeTypes();
    fetchColors();
    fetchOccasions();
    fetchWeaveTypes();
  }, []);
  
  useEffect(() => {
    const payload = {
      ...filters,
      sortBy,
      page: 1,
      limit: 10
    };
    dispatch(GetSarees(payload));
  }, [filters, sortBy]);
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
  // const sortedAndFilteredProducts = sarees?.data || [];

  // Toggle dropdown visibility
  const toggleDropdown = (type) => {
    setDropdowns((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };


   
  const updateFilter = (type, value) => {
    setFilters((prev) => {
      const newValue = prev[type].includes(value)
        ? prev[type].filter(item => item !== value)  // Remove the value if it's already selected
        : [...prev[type], value];  // Add the value to the filter array if not already present
      return { ...prev, [type]: newValue };
    });
  };
 
  const sortedAndFilteredProducts = [...(sarees?.data || [])]
  .filter((saree) => {
    return (
      (filters.color.length === 0 || filters.color.includes(saree.color_name)) &&
      (filters.sareeType.length === 0 || filters.sareeType.includes(saree.saree_name)) &&
      (filters.occasion.length === 0 || filters.occasion.includes(saree.occasion_name)) &&
      (filters.weaveType.length === 0 || filters.weaveType.includes(saree.weave_name)) &&
      (!filters.minPrice || saree.price >= filters.minPrice) &&
      (!filters.maxPrice || saree.price <= filters.maxPrice)
    );
  })
  .sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    return 0; // No sorting if no sort order is selected
  });
  

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
          <h4>Filter By</h4>
    
        
       <hr />
          {/* fabric Filter */}
          <div className="filter-group">
        <button className="dropbtn" onClick={() => toggleDropdown('fabric')}>
          {dropdowns.fabric ? 'Fabric' : 'Fabric'}
        </button>
        {dropdowns.fabric && (
         <div className="dropdown-content">
         {sareeTypes.map((type) => (
           <label key={type.id}>
             <input 
               type="checkbox" 
               onChange={() => updateFilter('sareeType', type.saree_name)} 
               checked={filters.sareeType.includes(type.saree_name)} 
             /> {type.saree_name}
           </label>
         ))}
       </div>
        )}
      </div>

    <hr />
    {/* Occasion Filter */}
      <div className="filter-group">
        <button className="dropbtn" onClick={() => toggleDropdown('occasion')}>
          {dropdowns.occasion ? 'Occasion' : 'Occasion'}
        </button>
        {dropdowns.occasion && (
        <div className="dropdown-content">
        {occasions.map((occasion) => (
          <label key={occasion.id}>
            <input
              type="checkbox" 
              onChange={() => updateFilter('occasion', occasion.occasion_name)} 
              checked={filters.occasion.includes(occasion.occasion_name)} 
            /> {occasion.occasion_name}
          </label>
        ))}
      </div>
        )}
      </div>

<hr />
        {/* Weave Type Filter */}
        <div className="filter-group">
          <button className="dropbtn" onClick={() => toggleDropdown('weaveType')}>
            {dropdowns.weaveType ? 'Weave Type' : 'Weave Type'}
          </button>
          {dropdowns.weaveType && (
           <div className="dropdown-content">
           {weaveTypes.map((weave) => (
             <label key={weave.id}>
               <input 
                 type="checkbox" 
                 onChange={() => updateFilter('weaveType', weave.weave_type_name)} 
                 checked={filters.weaveType.includes(weave.weave_type_name)} 
               /> {weave.weave_type_name}
             </label>
           ))}
         </div>
          )}
        </div>

        <hr />

      {/* Weave Type Filter */}
      <div className="filter-group">
            <button className="dropbtn" onClick={() => toggleDropdown('color')}>
            {dropdowns.color ? 'Colors' : 'Colors'}
          </button>
          {dropdowns.color && (
           <div className="dropdown-content">
           {colors.map((color) => (
             <label key={color.id}>
               <input 
                 type="checkbox" 
                 onChange={() => updateFilter('color', color.color_name)} 
                 checked={filters.color.includes(color.color_name)} 
               /> {color.color_name}
             </label>
           ))}
         </div>
          )}
        </div>
          </div>

        {/* Right Side Product Cards */}
        <div className="col-md-10">
        <div className="d-flex justify-content-between align-items-center">
            <h1>OUR SAREE COLLECTION</h1>
            <div className="sort-dropdown" style={{ marginLeft: 'auto' }}>
             
              <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>


           
          <div className="row">
            {sortedAndFilteredProducts.length > 0 ? (
              sortedAndFilteredProducts.map((saree, index) => (
                <div className="col-md-4" key={saree.item_id}>
                  <div className="card c22">
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
                    {liked.some(likedItem => likedItem.id === saree.item_id) ? (
                      <svg className="w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.39">
                        <defs>
                          <style>{`.cls-1{fill:#ed1b24;fill-rule:evenodd;}`}</style>
                        </defs>
                        <path className="cls-1" d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                      </svg>
                    )}
                  </a>
                </div>
                    </div>

                    <div className="card-body text-center">
                      <h6 className="card-title">{saree.title}</h6>
                      <p className="card-text text-center">{saree.color_name}</p>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="card-text text-center">
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
    </div>
  );
}




