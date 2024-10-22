import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { products, discount } = location.state || { products: [], discount: 0 };

    const calculateSubtotal = () => {
        if (!Array.isArray(products)) {
            return 0;
        }
        return products.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);
    };

    const handleAddressChange = (e) => {
        setUseDifferentAddress(e.target.value === 'different');
    };


    const subtotal = calculateSubtotal();
    const discountedSubtotal = subtotal - (subtotal * discount);
    const totalPrice = discountedSubtotal + 40; // Add shipping charges

    const [useDifferentAddress, setUseDifferentAddress] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const [showBilling, setShowBilling] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "Saniya",
        lastName: "Zehra",
        address: "310/290 C1 bajpai nagar, jajmau",
        city: "Kanpur",
        state: "Uttar Pradesh",
        pinCode: "208010",
        phone: "+916391377235"
    });

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalAddress, setModalAddress] = useState(shippingAddress);

    // Handle form input change in modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalAddress((prev) => ({ ...prev, [name]: value }));
    };

    // Save updated address from modal
    const handleSaveAddress = () => {
        setShippingAddress(modalAddress); // Update the shipping address state
        setShowModal(false); // Close the modal
    };

    // Function to handle "Use a Different Address" - Opens a blank form
    const handleUseDifferentAddress = () => {
        setModalAddress({
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
            phone: ""
        });
        setShowModal(true); // Open modal
    };

    return (
        <div className="container mt-44 text-justify">
            <h2 className="text-center">Checkout</h2>
            <div className="row">
                <div className="col-md-8">
                    <form>
                        <h4 onClick={() => setShowAccount(!showAccount)} style={{ cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Account
                            <i className={`fas ${showAccount ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '8px' }}></i>
                        </h4>
                        {showAccount && (
                            <a href="#" className="text-primary">Log out</a>
                        )}
                        <p style={{ fontSize: '0.9rem' }}>zsaniya973@gmail.com</p>
                        <hr />

                        <h4 onClick={() => setShowShipping(!showShipping)} style={{ cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Ship to
                            <i className={`fas ${showShipping ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '8px' }}></i>
                        </h4>
                        {showShipping && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ fontSize: '0.9rem', marginRight: '8px' }}>
                                        {`${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pinCode}, Phone: ${shippingAddress.phone}`}
                                    </p>
                                    <i className="fas fa-pen" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}></i>
                                </div>
                                {/* New Anchor for "Use a Different Address" */}
                                <a href="#" onClick={handleUseDifferentAddress} style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}>
                                    + Use a Different Address
                                </a>
                            </div>
                        )}
                        <hr />
                        
                        {/* Billing Address section */}
                        <h4>Billing Address</h4>
                        <div className="mb-3">
                            <div>
                                <input
                                    type="radio"
                                    id="sameAddress"
                                    name="billingOption"
                                    value="same"
                                    onChange={handleAddressChange}
                                    checked={!useDifferentAddress}
                                />
                                <label htmlFor="sameAddress" className="ms-2">Same as your shopping address</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="radio"
                                    id="differentAddress"
                                    name="billingOption"
                                    value="different"
                                    onChange={handleAddressChange}
                                    checked={useDifferentAddress}
                                />
                                <label htmlFor="differentAddress" className="ms-2">Use a different billing address</label>
                            </div>
                        </div>

                        {/* Show the form for different billing address if selected */}
                        {useDifferentAddress && (
                            <div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="billingAddress" placeholder="Billing Address" required />
                                        <label htmlFor="billingAddress">Billing Address</label>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="billingLandmark" placeholder="Nearby Landmark" />
                                        <label htmlFor="billingLandmark">Nearby Landmark</label>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="billingCity" placeholder="City" required />
                                            <label htmlFor="billingCity">City</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select className="form-select" id="billingState" required>
                                                <option value="">Select State</option>
                                                <option>Andhra Pradesh</option>
                                                <option>Arunachal Pradesh</option>
                                                <option>Assam</option>
                                                <option>Bihar</option>
                                                <option>Chhattisgarh</option>
                                                <option>Goa</option>
                                                <option>Gujarat</option>
                                                <option>Haryana</option>
                                                <option>Himachal Pradesh</option>
                                                <option>Jharkhand</option>
                                                <option>Karnataka</option>
                                                <option>Kerala</option>
                                                <option>Madhya Pradesh</option>
                                                <option>Maharashtra</option>
                                                <option>Manipur</option>
                                                <option>Meghalaya</option>
                                                <option>Mizoram</option>
                                                <option>Nagaland</option>
                                                <option>Odisha</option>
                                                <option>Punjab</option>
                                                <option>Rajasthan</option>
                                                <option>Sikkim</option>
                                                <option>Tamil Nadu</option>
                                                <option>Telangana</option>
                                                <option>Tripura</option>
                                                <option>Uttar Pradesh</option>
                                                <option>Uttarakhand</option>
                                                <option>West Bengal</option>
                                                <option>Delhi</option>
                                                <option>Jammu and Kashmir</option>
                                                <option>Ladakh</option>
                                                <option>Chandigarh</option>
                                            </select>
                                            <label htmlFor="billingState">State</label>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="billingPinCode" placeholder="Pin Code" required />
                                            <label htmlFor="billingPinCode">Pin Code</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="billingMobile" placeholder="Mobile Number" required />
                                        <label htmlFor="billingMobile">Mobile Number</label>
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr />

                

                        <button type="submit" className="btn btn-primary w-48 mt-3">Pay Now</button>
                    </form>
                </div>
                  



                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    {products.map(product => (
                        <div className="card mb-3" key={product.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={product.image} className="card-img-left" alt="Product Image" style={{ width: '100px', height: 'auto' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">₹{product.price} x {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>Subtotal - {products.length} Items</span>
                        <span>₹{discountedSubtotal.toFixed(2)}</span>
                    </div> <br />
                    <div className="d-flex justify-content-between">
                        <span>Shipping Charges</span>
                        <span>₹40</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h5>Total</h5>
                        <h5>₹{totalPrice.toFixed(2)}</h5>
                    </div>
                </div>
            </div>

            {/* Modal for editing or adding address */}
            {showModal && (
                <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '100px auto' }}>
                        <h4>Edit Address</h4>
                        <div className="form-group">
                            {/* First Name and Last Name in one row */}
                            <div className="row">
                                <div className="col-md-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={modalAddress.firstName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={modalAddress.lastName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={modalAddress.address}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        {/* City and State in one row */}
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={modalAddress.city}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={modalAddress.state}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* PIN Code and Phone in one row */}
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>PIN Code</label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={modalAddress.pinCode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={modalAddress.phone}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveAddress}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
