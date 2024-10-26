import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './TrackOrder.css'; 
import axios from 'axios';

const TrackOrder = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchType, setSearchType] = useState('orderId'); // Default to Order ID
    const [orderTrack, setOrderTrack] = useState(null);
    const [loginUser, setLoginUser] = useState();

    const navigate = useNavigate();

    // Get user data from session storage
    function getLoginUser() {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        setLoginUser(data);
    };

    // Fetch order tracking details when the button is clicked
    const fetchOrderTrack = async (customer_id, order_id) => {
        console.log("Fetching order details for customer_id:", customer_id, "and order_id:", order_id);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/search?customer_id=${customer_id}&order_id=${order_id}`);
            let data = await response.data?.data;
            console.log("Order details response:", response.data);

            if (data && data.length > 0) {
                setOrderTrack(data);
                // navigate(`/track-product/${order_id}`);
                navigate('/track-product', { state: { orderData: data } });
              
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Order Not Found',
                    text: 'Please check your Order ID and try again.',
                    confirmButtonText: 'Retry',
                    confirmButtonColor: '#d33'
                });
            }
        } catch (error) {
            console.error("Failed", error);
            if(error?.status == 404){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error?.response.data.message,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33'
                });
            }
           
        }
    };

    // Handle button click for tracking order
    const handleTrackOrder = () => {
        if (!inputValue) {
            Swal.fire({
                icon: 'info',
                title: 'Input Required',
                text: 'Please enter your order ID or tracking number.',
                confirmButtonText: 'OK'
            });
            return;
        }

        console.log("Tracking order with ID:", inputValue);
        fetchOrderTrack(loginUser?.id, inputValue);
    };

    // Fetch login user details on component mount
    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <div className="track-order-container">
            <div className="track-order-box">
                <div className="search-options">
                    <label>Search By:</label>
                    <label>
                        <input 
                            type="radio" 
                            value="orderId" 
                            checked={searchType === 'orderId'} 
                            onChange={() => setSearchType('orderId')} 
                        />
                        Order ID/No
                    </label>
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g., DSA-25630)" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                    />
                    {inputValue && (
                        <button className="clear-button" onClick={() => setInputValue('')}>
                            &#x2716; {/* Cross icon to clear the input */}
                        </button>
                    )}
                </div>
                <button 
                    className="track-button" 
                    onClick={handleTrackOrder}
                >
                    Track Your Order
                </button>
                <p className="note">Check the current status of your shipment.</p>
            </div>
        </div>
    );
};

export default TrackOrder;









 