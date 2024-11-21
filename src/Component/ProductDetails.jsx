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
  const [rating, setRating] = useState(4.5);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loginData);
  // Zoom-related states
const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
const [isZooming, setIsZooming] = useState(false);

const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };
  
  const handleMouseEnter = () => {
    setIsZooming(true);
  };
  
  const handleMouseLeave = () => {
    setIsZooming(false);
  };


  useEffect(() => {
    const fetchSaree = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
        console.log("responsep",response.data?.data)
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
      title: saree.title,
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
 
  const getLoginUser = () => {
    const data = JSON.stringify(sessionStorage.getItem('userData'))
    setLoginUser(data)
  }

  const handleBuyNow = () => {
   
    // Add the item to the cart first
     handleAddToCart();

    const buyNowItem = {
      id: saree.item_id,
      saree_name: saree.saree_name,
      title: saree.title,
      price: saree.price,
      quantity: 1,
      main_image_url: saree.main_image_url,
    };
    // Navigate to checkout with this item as order summary data
    navigate('/checkout');
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-60">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 product-image-container">
          {/* Main Image */}
        <div
            id="mainImage"
            className="image-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
              src={mainImage || 'https://via.placeholder.com/150'}
              alt="Product Image"
              className="product-image"
            //   style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
             {isZooming && (
                    <div
                        className="magnifier"
                        style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }}
                    ></div>
                    )}
        </div>


          {/* Sub Images / Thumbnails */}
          <div className="thumbnail-container mt-3">
            {(saree?.image_url1 !== null && saree?.image_url1?.trim() !== '') && (
              <img
                src={saree.image_url1}
                alt="Thumbnail 1"
                className="thumbnail"
                onClick={() => changeImage(saree.image_url1)}
              />
            )}
            {(saree?.image_url2 !== null && saree?.image_url2?.trim() !== '') && (
              <img
                src={saree.image_url2}
                alt="Thumbnail 2"
                className="thumbnail"
                onClick={() => changeImage(saree.image_url2)}
              />
            )}
            {(saree?.image_url3 !== null && saree?.image_url3?.trim() !== '') && (
              <img
                src={saree.image_url3}
                alt="Thumbnail 3"
                className="thumbnail"
                onClick={() => changeImage(saree.image_url3)}
              />
            )}
            {(saree?.image_url4 !== null && saree?.image_url4?.trim() !== '')  && (
              <img
                src={saree.image_url4}
                alt="Thumbnail 4"
                className="thumbnail"
                onClick={() => changeImage(saree.image_url4)}
              />
            )}
            {(saree?.image_url5 !== null && saree?.image_url5?.trim() !== '') && (
              <img
                src={saree.image_url5}
                alt="Thumbnail 5"
                className="thumbnail"
                onClick={() => changeImage(saree.image_url5 )}
              />
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 text-left">
          {/* Product Name */}
          <h1>{saree?.title}</h1>

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
             
           <li><i className="fas fa-calendar-day"></i> Occasion: {saree?.occasion_name || 'N/A'}</li>
          <li><i className="fas fa-ruler"></i> Length: {saree?.size}</li>
          <li><i className="fas fa-weight-hanging"></i> Weight: {saree?.weight || 'N/A'}</li>
          <li><i className="fas fa-barcode"></i> Code: {saree?.code_name || 'N/A'}</li>
          <li><i className="fas fa-tshirt"></i> Blouse Description: {saree?.boluse_des || 'N/A'}</li>
          <li><i className="fas fa-box"></i> Included Components: {saree?.included_components || 'N/A'}</li>
          <li><i className="fas fa-warehouse"></i> Stock Quantity: {saree?.stock_quantity || 'N/A'}</li>
          <li><i className="fas fa-feather"></i> Fabric Type: {saree?.fabric_type_name || 'N/A'}</li>
          <li><i className="fas fa-layer-group"></i> Weave Type: {saree?.weave_name || 'N/A'}</li>
          <li><i className="fas fa-palette"></i> Color: {saree?.color_name || 'N/A'}</li>
          {/* <li><i className="fas fa-globe"></i> Country of Origin: {saree?.country_of_origin}</li> */}
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
            <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button>
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
      .product-image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
       
      }
      
      .product-image {
        width: 100%;
        height: 100%;
        object-fit:contain; /* Ensures the entire image is visible without cropping */
        object-position: center; /* Centers the image */
        transition: transform 0.3s ease; /* Smooth zoom effect */
      }
      
      .image-container {
        position: relative;
        width: 100%; /* Makes it responsive */
        max-width: 500px; /* Limits the maximum size */
        height: auto; /* Adjust height automatically */
        border: 1px solid #ddd;
        background-color: #f9f9f9;
        overflow: hidden;
        cursor: zoom-in;
      }
      
      .image-container:hover .product-image {
        transform: scale(1.2); /* Zoom-in effect on hover */
        transition: transform 0.3s ease-in-out; /* Smooth transition */
      }
      
      .zoomed-image {
        margin-top: 20px;
        width: 500px;
        height: 500px;
        border: 1px solid #ddd;
        background-repeat: no-repeat;
        background-size: 200%;
      }
      
      
      
      /* Magnifier Effect */
      .magnifier {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 200%; /* Magnification level */
        pointer-events: none;
        z-index: 2;
      }
      
      
      /* Thumbnail Container */
      .thumbnail-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
      }
      
      .thumbnail {
        width: 70px;
        height: 70px;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        object-fit: cover;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .thumbnail:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
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