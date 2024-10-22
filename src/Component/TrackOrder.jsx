import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackOrder.css'; // Ensure your styles are updated for the new UI

const TrackOrder = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchType, setSearchType] = useState('orderId'); // Default to Order ID
    const navigate = useNavigate();

    const handleTrackOrder = () => {
        // If input is empty, show an alert
        if (!inputValue) {
            alert("Please enter your order ID or tracking number.");
            return;
        }

        // If input is provided, navigate to the track-product page
        navigate('/track-product', { state: { orderId: inputValue, searchType } });
    };

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
                    <label>
                        <input 
                            type="radio" 
                            value="trackingId" 
                            checked={searchType === 'trackingId'} 
                            onChange={() => setSearchType('trackingId')} 
                        />
                        Tracking ID/AWB
                    </label>
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder={searchType === 'orderId' ? "DSA-25630" : "Enter Tracking ID"} 
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
