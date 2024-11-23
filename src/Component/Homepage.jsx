import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetSarees } from '../Redux/Sarees/sareeAction';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Homepage() {
  const dispatch = useDispatch();
  const sarees = useSelector((store) => store.saree?.sarees);
  const [loginUser, setLoginUser] = useState();
  const [sortOrder, setSortOrder] = useState('low');


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


  return (
    <div>
      {/* Carousel Start  */}
      <div className="container-flud cr">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/assets/images/carousel/c1.jpeg" className="d-block w-100" />
            </div>
            <div className="carousel-item" >
              <img src="/assets/images/carousel/c2.jpeg" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/carousel/c3.jpeg" className="d-block w-100" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Marquee Start */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mq">
            <marquee behavior="scroll" scrollamount="12" direction="left">
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span> &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>&nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <i className='fas fa-bolt'></i>  &nbsp;<span id='sp'>In This Festivals : Save Up to 70% Off At Cottan Silk Sarees</span>
            </marquee>
          </div>
        </div>
      </div>
      {/* Marquee End */}   {/* Product card Start */}






      <center>

      <div className="container mt-8">
          <div className="row">
            <center>
              <h1>OUR NEW COLLECTION</h1>
            </center>
            {sarees?.data?.slice(0, 8).map((saree, index) => (
          <div className="col-md-3" key={saree.item_id}>
            <div className="card">
              <div style={{ position: 'relative', display: 'inline-block' }}>
              <Link to={`/product-details/${saree.item_id}`} className="image-container">
                  <img
                    src={saree.main_image_url}
                    alt={saree.title}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
              </Link>
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
                <p className='text-center'>({saree.color_name})</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                  <p className="card-text text-nowrap">
                          <b className="text-danger">₹{saree.price}</b>&nbsp;
                          <s className="text-muted">₹{(saree.price * 1.14).toFixed(2)}</s>&nbsp;
                          <span className="text-success">(14% Off)</span>
                  </p>
                    <a href="#"><p className="rating"> 4.4 &nbsp;<i className="fa fa-star"></i></p></a>
                  </li>
                </ul>
                <div className="card-body">
                   <button className="button-28" onClick={()=>addToCart(saree)}>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <a href="/saree"><button className="button-28" role="button">VIEW MORE</button></a></div>
            <div className="col-md-4"></div>

          </div>
        </div>

      </center>

      {/* Category Overview Section Start */}
      <div className="container-fluid">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4 -mb-10 text-center">
              <div className="sm:w-1/2 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src="assets/images/product/bag.jpg" />
                </div>
                <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Discover Our Latest Collection OF Bags</h2>
                <p className="leading-relaxed text-base">Elevate your style with our premium range of bags</p>
                <a href="/comming-soon">     <button className="button-28" role="button">SHOP BAGS</button></a>
              </div>
              <div className="sm:w-1/2 mb-10 px-4">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img alt="content" className="object-cover object-center h-full w-full" src="assets/images/product/suit.jpg" />
                </div>
                <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Discover Our Latest Collections Of Suits</h2>
                <p className="leading-relaxed text-base">Find the perfect suit for any occasion</p>
                <a href="/comming-soon">     <button className="button-28" role="button">SHOP SUITS</button></a>

              </div>
            </div>
          </div>
        </section></div>
      {/* Category Overview Section End */}



      {/* Features 2.0 Start */}
      <div className="container">
      
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Why Shop with D'Sa Fashion & Home Décor?</h1>

          </div> 
           <div className="row ca">
          <div className="col-md-3 fe">
            <i className='fa fa-truck text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Fast and reliable shipping to your doorstep.</span>
          </div>

          <div className="col-md-3 fe">
            <i className='fa fa-headset text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Dedicated customer support for all your queries.</span>
          </div>
          <div className="col-md-3 fe">
            <i className='fa fa-lock text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Secure payment options for a safe shopping experience.</span>
          </div>

        </div>
        <div className="row mt-5 ca">
          <div className="col-md-3 fe">
            <i className='fa fa-undo text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Hassle-free returns and refunds within 7 days.</span>
          </div>

          <div className="col-md-3 fe">
            <i className='fa fa-star text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Premium quality products, carefully curated.</span>
          </div>
          <div className="col-md-3 fe">
            <i className='fa fa-th-large text-6xl' id='ic'></i>
            <br />
            <span className="text-2xl">Enjoy a wide range of collections for every occasion.</span>
          </div>
 

        </div>

        <div className="row mt-4">
          <div className="col-md-4"></div>
          <div className="col-md-4 bt">
            <a href="/privacy-policy">
              <button className="view" role="button">VIEW OUR POLICIES</button>
            </a>
          </div>
          <div className="col-md-4"></div>

        </div>

      </div>
      {/* Features 2.0 End */}
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
  )
}
