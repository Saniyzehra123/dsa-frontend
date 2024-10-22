 


import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loginUser, setLoginUser] = useState();

  // Load the wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setProducts(JSON.parse(savedWishlist));
    }
  }, []);

  // Function to delete an item from the wishlist
  const deleteItem = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('wishlist', JSON.stringify(updatedProducts));
    toast.warn('Product removed from wishlist', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  // Function to add an item to the cart
  // const addToCart = (product) => {
  //   const cartList = {
  //     id: product.id,
  //     saree_name: product.saree_name,
  //     price: product.price,
  //     quantity: 1,
  //     image: product.image,
  //   };

  //   let updatedCartList = JSON.parse(localStorage.getItem('itemlist')) || [];
  //   const existingItemIndex = updatedCartList.findIndex(cartItem => cartItem.id === cartList.id);

  //   if (existingItemIndex !== -1) {
  //     // If the product is already in the cart
  //     toast.warn('This product is already in your cart!', {
  //       position: 'top-right',
  //       autoClose: 2000,
  //     });
  //   } else {
  //     updatedCartList.push(cartList);
  //     localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
  //     toast.success(
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <img src={product.image} alt={product.saree_name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  //         <span>{product.saree_name} added to your cart!</span>
  //       </div>,
  //       {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       }
  //     );
  //   }
  // };


  // Updated addToCart function for wishlist
 

  const addToCart = (item) => {
    const cartList = {
      id: item.id, 
      saree_name: item.saree_name,
      price: item.price,
      quantity: 1, // Default quantity of 1
      main_image_url: item.image || item.main_image_url, 
      customer_id: loginUser?.id || ''
    };
  
    let updatedCartList = JSON.parse(localStorage.getItem('itemlist')) || [];
    const existingItemIndex = updatedCartList.findIndex((cartItem) => cartItem.id === cartList.id);
  
    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      updatedCartList[existingItemIndex].quantity += 1; // Increase the quantity by 1
      localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
      window.dispatchEvent(new Event('storage'));
  
      // Show Toastify message for updated quantity
      toast.info(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={updatedCartList[existingItemIndex].main_image_url}
            alt={updatedCartList[existingItemIndex].saree_name}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
          <span>Quantity updated for {updatedCartList[existingItemIndex].saree_name}!</span>
        </div>,
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    } else {
      // If the item does not exist, add it to the cart
      updatedCartList.push({ ...cartList, count: 1 });
      localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
      window.dispatchEvent(new Event('storage'));
  
      // Show Toastify message for adding a new product
      toast.success(
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={cartList.main_image_url}
            alt={cartList.saree_name}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
          <span>{cartList.saree_name} added to your cart successfully!</span>
        </div>,
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    }
  };
  

  // const addToCart = (item) => {
  //   const cartList = {
  //     id: item.id, 
  //     saree_name: item.saree_name,
  //     price: item.price,
  //     quantity: 1,
  //     main_image_url: item.image || item.main_image_url, 
  //     customer_id: loginUser?.id || ''
  //   };
  
  //   let updatedCartList = JSON.parse(localStorage.getItem('itemlist')) || [];
  //   const existingItemIndex = updatedCartList.findIndex((cartItem) => cartItem.id === cartList.id);
  
  //   if (existingItemIndex !== -1) {
  //     toast.warn('This product is already in your cart!', {
  //       position: 'top-right',
  //       autoClose: 2000,
  //     });
  //   } else {
  //     updatedCartList.push({ ...cartList, count: 1 });
  //     localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
  //     window.dispatchEvent(new Event('storage'));
  
  //     // Add success toast with image and saree name
  //     toast.success(
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <img
  //           src={cartList.main_image_url}
  //           alt={cartList.saree_name}
  //           style={{ width: '90px', height: '90px', marginRight: '10px' }}
  //         />
  //         <span>{cartList.saree_name} added to your cart successfully!</span>
  //       </div>,
  //       {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       }
  //     );
  //   }
  // };
  



  // const addToCart = (product) => {
  //   const cartList = {
  //     id: product.id,
  //     saree_name: product.saree_name,
  //     price: product.price,
  //     quantity: 1,
  //     image: product.image,
  //   };
  
  //   let updatedCartList = JSON.parse(localStorage.getItem('itemlist')) || [];
  //   const existingItemIndex = updatedCartList.findIndex(cartItem => cartItem.id === cartList.id);
  
  //   if (existingItemIndex !== -1) {
  //     toast.warn('This product is already in your cart!', {
  //       position: 'top-right',
  //       autoClose: 2000,
  //     });
  //   } else {
  //     updatedCartList.push(cartList);
  //     localStorage.setItem('itemlist', JSON.stringify(updatedCartList));
  
  //     // Dispatch a storage event to update cart count in the navbar
  //     window.dispatchEvent(new Event('storage'));
  
  //     toast.success(
  //       <div style={{ display: 'flex', alignItems: 'center' }}>
  //         <img src={product.image} alt={product.saree_name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
  //         <span>{product.saree_name} added to your cart!</span>
  //       </div>,
  //       {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       }
  //     );
  //   }
  // };
  

  return (
    <div className="container my-4">
      <div className="row">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <section className="text-gray-600 body-font mt-8">
                <div className="container px-5 pt-24 mx-auto">
                  <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Wishlist</h1>
                    <hr />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center">
          <p className='text-xl'>Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="row d-flex justify-content-center">
          {products.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card position-relative">
                <a href="/product-details" className="image-container">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.saree_name}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'contain' }}
                  />
                </a>
                <div className="position-absolute" style={{ top: '10px', right: '10px', zIndex: 2 }}>
                  <button 
                    onClick={() => deleteItem(product.id)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <MdClose size={24} color="black" />
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.saree_name}</h5>
                  <p className="card-text">{product.color || '(Product color not available)'}</p>
                  <p className="card-text">
                    <strong>Price: ₹{product.price}</strong> <del>₹{product.price + product.price * 0.2}</del>
                    <span className="text-amber-400">(20% Off)</span>
                  </p>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />

      <style jsx>{`
        .card {
          transition: transform 0.2s;
        }

        .card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Wishlist;
