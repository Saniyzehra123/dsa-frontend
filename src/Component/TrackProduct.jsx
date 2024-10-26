// import React from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation hook
// import './TrackProduct.css'; // Import the CSS file

// const TrackProduct = () => {
//     const location = useLocation();
//     const { state } = location;
//     const orderData = state?.orderData; // Access the passed data

//     // Extract data (assuming orderData is an array)
//     const order = orderData ?? []; // Fetch the first order from the array, adjust if needed

//      console.log("datapro",order)
//     // // Fallbacks if no data is available
//     // const orderId = order?.order_id || 'N/A';
//     // const orderDate = order?.created_at ? new Date(order?.created_at).toLocaleDateString() : 'N/A';
//     // const currentStatus = order?.status_type || 'N/A';
//     // const productImage = order?.main_image_url || 'https://via.placeholder.com/150'; // Fallback image if null
//     // const productDescription = order?.des || 'Product description not available';
//     // const productPrice = order?.price || 'N/A';
//     // const productQuantity = order?.quantity || 'N/A';
    
//     return (
//         <div className="container">
//         <h3 className="heading">Track your Deliveries</h3>

//         {/* Loop through the orderData array and display each order in its own box */}
//         {orderData.map((order, index) => (
//             <div key={index} className="order-box"> {/* Add a container for each order */}
//                 {/* Header - Order Details */}
//                 <div className="header">
//                     <div className="header-text">
//                         <p>Order Placed</p>
//                         <p>{new Date(order.created_at).toLocaleDateString()}</p>
//                     </div>
//                     <div className="header-text">
//                         <p>Order ID</p>
//                         <p>{order.order_id}</p>
//                     </div>
//                 </div>

//                 {/* Current Status Card */}
//                 <div className="status-container">
//                     <p className="status-text">
//                         Current Status: <span className="status-label">{order.status_type}</span>
//                     </p>
//                 </div>

//                 {/* Product Details Card */}
//                 <div className="product-card">
//                     <img
//                         src={order.main_image_url || 'https://via.placeholder.com/150'} // Use placeholder if image URL is null
//                         alt={order.des || 'Product description not available'}
//                         className="product-image"
//                     />
//                     <div className="product-info">
//                         <p>{order.des || 'Katan Silk With Silver Zari Work'}</p> {/* Use description or fallback */}
//                         <p>Price: ₹{order.price}</p>
//                         <p>Quantity: {order.quantity}</p>
//                     </div>
//                 </div>

//                 {/* Address Details */}
//                 <div className="address-container">
//                     <h4>Shipping Address</h4>
//                     <p>{order.address}, {order.city}, {order.state}, {order.country}, {order.pincode}</p>
//                 </div>
//             </div>
//         ))}
//     </div>
//     );
// };

// export default TrackProduct;









// // import React from 'react';
// // import './TrackProduct.css'; // Import the CSS file

// // const TrackProduct = () => {
// //     const orderId = 'DSA-25603';
// //     const orderDate = '15th Oct 2024';
// //     const currentStatus = 'Cancelled';

// //     return (
// //         <div className="container">
// //             {/* Header - Order Details */}
// //             <div className="header">
// //                 <div className="header-text">
// //                     <p>Order Placed</p>
// //                     <p>{orderDate}</p>
// //                 </div>
// //                 <div className="header-text">
// //                     <p>Order ID</p>
// //                     <p>{orderId}</p>
// //                 </div>
// //             </div>

// //             {/* Track Your Deliveries Heading */}
// //             <h3 className="heading">Track your Deliveries</h3>

// //             {/* Current Status Card */}
// //             <div className="status-container">
// //                 <p className="status-text">
// //                     Current Status: <span className="status-label">{currentStatus}</span>
// //                 </p>
// //                 <button className="cancel-button">{currentStatus}</button>
// //             </div>

// //             {/* Product Details Card */}
// //             <div className="product-card">
// //                 <img
// //                     src="https://dsafashionwear.com/images/DSA_01/DSA_01.jpg"
// //                     alt="Palkon Ki Leher"
// //                     className="product-image"
// //                 />
// //                 <div className="product-info">
// //                     <p>Katan Silk With Silver Zari Work</p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default TrackProduct;


import React from 'react';
import { useLocation } from 'react-router-dom';
import './TrackProduct.css';

const TrackProduct = () => {
    const location = useLocation();
    const { state } = location;
    const orderData = state?.orderData ?? []; // Fallback to an empty array if orderData is not provided

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
                                <p>{order.des || 'Product Name'}</p>
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


