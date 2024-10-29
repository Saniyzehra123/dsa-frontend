import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Cart/cartAction';  // Adjust the path as per your folder structure
import 'react-toastify/dist/ReactToastify.css'; 
import { toast, ToastContainer } from 'react-toastify';


const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [saree, setSaree] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginUser, setLoginUser] = useState({});
  const [rating, setRating] = useState(4.5); // Default rating value for display
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loginData);

  useEffect(() => {
    const fetchSaree = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
        setSaree(response.data?.data);
       
        setMainImage(response.data?.data.main_image_url); // Set the main image
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch saree details');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchSaree();
    }
    // getLoginUser();
  }, [id]);
  

  const changeImage = (image) => {
    setMainImage(image);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // const handlePinCodeChange = (e) => {
  //   setPinCode(e.target.value);
  // };

  // const checkLocation = () => {
  //   alert(`Checking location for pin code: ${pinCode}`);
  // };

  const renderStars = () => {
    const stars = [];
    let ratingValue = rating;

    for (let i = 0; i < 5; i++) {
      if (ratingValue >= 1) {
        stars.push(<FaStar key={i} color="gold" />);
      } else if (ratingValue >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
      ratingValue -= 1;
    }
    return stars;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // Add the addToCart function

  const handleAddToCart = () => {
    const cartItem = {
      id: saree.item_id,
      saree_name: saree.saree_name,
      price: saree.price,
      quantity: 1,  // Default quantity can be set to 1
      main_image_url: saree.main_image_url,
      customer_id: loginUser?.id || ''
    };
  
    let updatedCart = JSON.parse(localStorage.getItem('itemlist')) || [];
  
    // Check if the item already exists in the cart
    const existingItemIndex = updatedCart.findIndex(item => item.id === cartItem.id);
  
    if (existingItemIndex !== -1) {
      // If the product is already in the cart, increment the quantity
      updatedCart[existingItemIndex].quantity += 1;
  
      // Show a toast message for quantity update
      toast.info(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={updatedCart[existingItemIndex].main_image_url}
            alt={updatedCart[existingItemIndex].saree_name}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
          <span>Quantity updated for {updatedCart[existingItemIndex].saree_name}!</span>
        </div>,
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    } else {
      // If the product does not exist, add it to the cart with a quantity of 1
      updatedCart.push({ ...cartItem, quantity: 1 });
  
      // Show a toast message for adding a new product
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={cartItem.main_image_url}
            alt={cartItem.saree_name}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
          <span>{cartItem.saree_name} added to your cart successfully!</span>
        </div>,
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    }
  
    // Update localStorage with the modified cart
    localStorage.setItem('itemlist', JSON.stringify(updatedCart));
  
    // Trigger an event to notify other parts of the app
    window.dispatchEvent(new Event('storage'));
  };
  
  
 
//   const handleAddToCart = () => {
//     const cartItem = {
//       id: saree.item_id,
//       saree_name: saree.saree_name,
//       price: saree.price,
//       quantity: 1,  // Default quantity can be set to 1
//       main_image_url: saree.main_image_url,
//       customer_id:loginUser?.id || ''
//     };

//     console.log("Item to add to cart:", cartItem); // Log the cart item
//     // if(loginUser?.id){
//     //   dispatch(addToCart(cartItem));
//     // }

     
//     navigate('/cart'); // Navigate to cart page
// };
const getLoginUser=()=>{
  const data= JSON.stringify(sessionStorage.getItem('userData'))
  setLoginUser(data)
}

const addToCart = () => {
  const cartList = {
    id: saree.item_id,
    saree_name: saree.saree_name,
    price: saree.price,
    quantity: 1,  // Default quantity can be set to 1
    main_image_url: saree.main_image_url,
    customer_id:loginUser?.id || ''
  };
  let updatedCart = JSON.parse(localStorage.getItem('itemlist')) || [];
  const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === cartList.id);
  
  if (existingItemIndex !== -1) {
    updatedCart[existingItemIndex].count = updatedCart[existingItemIndex].count || 1;
    updatedCart[existingItemIndex].count += 1;
  } else {
    updatedCart.push({ ...cartList, count: 1 });
  }
  localStorage.setItem('itemlist', JSON.stringify(updatedCart)); // Update localStorage
  window.dispatchEvent(new Event('storage'));
};

  return (
    <div className="container mt-44">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6">
          {/* Main Image */}
          <div id="mainImage" className="mb-3">
            <img
              src={mainImage || 'https://via.placeholder.com/150'}
              alt="Product Image"
              className="product-image"
            />
          </div>

          {/* Sub Images / Thumbnails */}
          <div className="d-flex flex-wrap justify-content-start">
            {saree?.image_url1 && (
              <img
                src={saree.image_url1}
                alt="Thumbnail 1"
                className="thumbnail mr-2"
                onClick={() => changeImage(saree.image_url1)}
              />
            )}
            {saree?.image_url2 && (
              <img
                src={saree.image_url2}
                alt="Thumbnail 2"
                className="thumbnail mr-2"
                onClick={() => changeImage(saree.image_url2)}
              />
            )}
            {saree?.image_url3 && (
              <img
                src={saree.image_url3}
                alt="Thumbnail 3"
                className="thumbnail mr-2"
                onClick={() => changeImage(saree.image_url3)}
              />
            )}
            {saree?.image_url4 && (
              <img
                src={saree.image_url4}
                alt="Thumbnail 4"
                className="thumbnail mr-2"
                onClick={() => changeImage(saree.image_url4)}
              />
            )}
            {saree?.image_url5 && (
              <img
                src={saree.image_url5}
                alt="Thumbnail 5"
                className="thumbnail mr-2"
                onClick={() => changeImage(saree.image_url5)}
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 text-left">
          {/* Product Name */}
          <h1>{saree?.saree_name}</h1>

          {/* Product Rating */}
          <div className="product-rating mb-3">
            <div className="stars d-flex">
              {renderStars()}
            </div>
            <p className="rating-text">({rating} out of 5 stars)</p>
          </div>

         {/* Discount Price */}
                  {/* Discount Price */}
          <h2 className="text-danger">
            ₹{saree?.price}&nbsp;
            <s className="text-muted">₹{(saree?.price * 1.14).toFixed(2)}</s>
            &nbsp;<span className="text-success">({(14).toFixed(0)}% Off)</span>
          </h2>

          {/* Saree Details */}
          <ul className="saree-details">
            {
              saree?.blouse_name !=null ?<li><i className="fas fa-tshirt"></i> Blouse Type: {saree?.blouse_name}</li>:''
            }
            <li><i className="fas fa-th-large"></i> Components: {saree?.components_description || 'N/A'}</li>
            <li><i className="fas fa-calendar-day"></i> Occasion: {saree?.occasion_name || 'N/A'}</li>
            <li><i className="fas fa-ruler"></i> Length: {saree?.saree_length}</li>
            <li><i className="fas fa-weight-hanging"></i> Weight: {saree?.saree_weight || 'N/A'}</li>
            {
              saree?.weave_name !=null ?<li><i className="fas fa-fabric"></i> Weave Type: {saree?.weave_name}</li>:""
            }
            
            <li><i className="fas fa-globe"></i> Country of Origin: {saree?.country_of_origin}</li>
          </ul>

          {/* Quantity Selector */}
          {/* <div className="quantity-selector mt-3">
            <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
            &nbsp;&nbsp;
            <span>{quantity}</span>
            &nbsp;&nbsp;
            <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
          </div> */}

          {/* Location Check */}
          {/* <div className="location-check mt-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-map-marker-alt"></i> &nbsp; Check Location
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your pin code"
                value={pinCode}
                onChange={handlePinCodeChange}
              />
              <button className="btn btn-primary" onClick={checkLocation}>
                Check
              </button>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="action-buttons mt-12">
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            &nbsp;&nbsp;
            <button className="btn btn-success">Buy Now</button>
          </div>
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


      <style jsx>{`
        .product-image {
          width: 100%;
          max-height: 650px;
          object-fit: cover;
        }
        .thumbnail {
        width: 80px;
        height: 120px; /* Increased height */
        margin: 5px;
        cursor: pointer;
        opacity: 0.6;
      }
      .thumbnail:hover {
        opacity: 1;
      }
        .d-flex {
          display: flex;
          flex-wrap: wrap;
        }
        .product-rating {
          display: flex;
          align-items: center;
        }
        .stars {
          margin-right: 10px;
        }
        .rating-text {
          color: #999;
        }
        .saree-details {
          list-style: none;
          padding: 0;
        }
        .saree-details li {
          margin-bottom: 10px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;


 