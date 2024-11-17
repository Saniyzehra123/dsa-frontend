 
import React from 'react';
import { useLocation } from 'react-router-dom';
import './TrackProduct.css';

const TrackProduct = () => {
    const location = useLocation();
    const { state } = location;
    const orderData = state?.orderData ?? []; // Fallback to an empty array if orderData is not provided
 console.log("order data to tack",orderData)
    return (
        <div className="track-product-container">
            <div className="container">
                <h3 className="heading">Track your Deliveries</h3>

                {/* Loop through each order and render the UI */}
                {orderData.map((order, index) => (
                    <div key={index} className="order-box">
                        {/* Header - Order Details */}
                        <div className="header">
                            <div className="header-text">
                                <p>Order Placed</p>
                                <p>{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="header-text">
                                <p>Order ID</p>
                                <p>{order.order_id || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Current Status Card */}
                        <div className='one'>
                        <div className="status-container">
                            <p className="status-text">
                                Current Status: <span className="status-label">{order.status_type || 'Pending'}</span>
                            </p>
                            <button className="cancel-button">{order.status_type || 'Pending'}</button>
                        </div>
                           <hr/>
                        {/* Product Details Card */}
                        <div className="product-card">
                            <img
                                src={order.main_image_url || 'https://via.placeholder.com/150'}
                                alt={order.des || 'Product description not available'}
                                className="product-image"
                            />
                            <div className="product-info">
                                <p>{order.title || 'Product Name'}</p>
                                <br/> 
                                <p>Price: ₹{order.price}</p>
                                <p>Quantity: {order.quantity}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackProduct;


