import React, { useState } from 'react';
import './TrackOrder.css'; 

const TrackOrder = () => {
    const [activeTab, setActiveTab] = useState('mobile');

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (

   
      <div>   
       <div className="container h45">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
      
            <h1>Track Your Order</h1>
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'mobile' ? 'active' : ''}`}
                    onClick={() => openTab('mobile')}
                >
                    Mobile Number
                </button>
                <button
                    className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
                    onClick={() => openTab('email')}
                >
                    Email
                </button>
                <button
                    className={`tab-button ${activeTab === 'order' ? 'active' : ''}`}
                    onClick={() => openTab('order')}
                >
                    Order Number
                </button>
            </div>

            {activeTab === 'mobile' && (
                <div className="tab-content active">
                    <form>
                        <label htmlFor="mobile-input">Enter Mobile Number:</label>
                        <input type="text" id="mobile-input" placeholder="+91-1234567890" required />
                        <button type="button" className="btn btn-outline-success">Track Order</button> <br /><br />
                    </form>
                </div>
            )}

            {activeTab === 'email' && (
                <div className="tab-content active">
                    <form>
                        <label htmlFor="email-input">Enter Email:</label>
                        <input type="email" id="email-input" placeholder="abc123@gmail.com" required />
                        <button type="button" className="btn btn-outline-success">Track Order</button> <br /><br />
                    </form>
                </div>
            )}

            {activeTab === 'order' && (
                <div className="tab-content active">
                    <form>
                        <label htmlFor="order-input">Enter Order Number:</label>
                        <input type="text" id="order-input" placeholder="12345678" required />
                        <button type="button" className="btn btn-outline-success">Track Order</button> <br /><br />
                    </form>
                </div>
            )}
       
        </div>
          <div className="col-md-4"></div>
        </div>
       </div>
      
        </div>

    );
};

export default TrackOrder;
