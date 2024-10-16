import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const [products, setProducts] = useState([]);

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

  // Function to increase product quantity
  const increaseQuantity = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, quantity: (product.quantity || 1) + 1 } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('wishlist', JSON.stringify(updatedProducts));
  };

  // Function to decrease product quantity
  const decreaseQuantity = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, quantity: Math.max((product.quantity || 1) - 1, 1) }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('wishlist', JSON.stringify(updatedProducts));
  };

  return (
    <div className="container mt-36">
      <h2 className="text-center">Wishlist</h2>
      <div className="cart-container">
        <div className="product-list">
          {products.length === 0 ? (
            <div className="text-center mt-5">
              <p className="text-xl">Your Wishlist is empty!</p>
            </div>
          ) : (
            products.map(product => (
              <div className="card mb-3" key={product.id} style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
                <img
                  src={product.image|| "https://via.placeholder.com/150"}
                  className="card-img-left"
                  alt="Product Image"
                  style={{ width: '20%', height: 'auto' }}
                />
                <div className="card-body text-justify" style={{ flex: 1 }}>
                  <h5 className="card-title">{product.saree_name || product.title}</h5>
                  <p>{product.color || '(Product color not available)'}</p>
                  <p className="card-text">
                    <b>₹{product.price}</b> <s>₹{product.price + product.price * 0.2}</s>
                    <b className="text-amber-400">(20% Off)</b>
                  </p>
                  <p className="rating text-justify">4.8 <i className="fa fa-star"></i></p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary me-2" onClick={() => decreaseQuantity(product.id)}>-</button>
                    <span className="me-2">{product.quantity || 1}</span>
                    <button className="btn btn-secondary me-2" onClick={() => increaseQuantity(product.id)}>+</button>
                    <button className="btn btn-danger" onClick={() => deleteItem(product.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
      <style jsx>{`
        .rating {
          width: 50px;
          margin-left: 1%;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;
