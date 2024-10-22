import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { products, discount } = location.state || { products: [], discount: 0 };

    const [useDifferentAddress, setUseDifferentAddress] = useState(false); // State to toggle different billing address

    const calculateSubtotal = () => {
        if (!Array.isArray(products)) {
            return 0;
        }
        return products.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);
    };

    const subtotal = calculateSubtotal();
    const discountedSubtotal = subtotal - (subtotal * discount);
    const totalPrice = discountedSubtotal + 40; // Add shipping charges

    const handleAddressChange = (e) => {
        setUseDifferentAddress(e.target.value === 'different');
    };

    return (
        <div className="container mt-44 text-justify">
            <h2 className="text-center">Checkout</h2>
            <div className="row">
                {/* Col-md-8 for the form */}
                <div className="col-md-8">
                    <form>
                        {/* Contact Information */}
                        <h4>Contact Information</h4>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-check mt-2">
                                <input type="checkbox" className="form-check-input" id="newsOffers" />
                                <label className="form-check-label" htmlFor="newsOffers">Email me with news and offers</label>
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <h4>Delivery Information</h4>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
                                    <label htmlFor="firstName">First Name</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="address" placeholder="Address" required />
                                <label htmlFor="address">Address</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="landmark" placeholder="Nearby Landmark" />
                                <label htmlFor="landmark">Nearby Landmark</label>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="city" placeholder="City" required />
                                    <label htmlFor="city">City</label>
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
                                    <input type="text" className="form-control" id="pinCode" placeholder="Pin Code" required />
                                    <label htmlFor="pinCode">Pin Code</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="mobile" placeholder="Mobile Number" required />
                                <label htmlFor="mobile">Mobile Number</label>
                            </div>
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="saveInfo" />
                            <label className="form-check-label" htmlFor="saveInfo">Save this information for next time</label>
                        </div>
                        <hr />

                        {/* Billing Address Section */}
                        <h4>Billing Address</h4><br />

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

                                <div className="mb-3 row">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="firstName" placeholder="First Name" required />
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="lastName" placeholder="Last Name" required />
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                    </div>
                                </div>
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

                        {/* Payment Details */}
                        <h4>Payment Details</h4><br />
                        <p>Original Subtotal: ₹{subtotal.toFixed(2)}</p>
                        <p>Discounted Subtotal: ₹{discountedSubtotal.toFixed(2)}</p>
                        <p>Shipping Charges: ₹40</p>
                        <hr />
                        <h5>Total: ₹{totalPrice.toFixed(2)}</h5>

                        <button type="submit" className="btn btn-primary w-100 mt-3">Pay Now</button>
                    </form>
                </div>

                {/* Col-md-4 for the cart summary */}
                {/* Col-md-4 for the cart summary */}
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
                        <span>₹{discountedSubtotal.toFixed(2)}</span> {/* Display discounted subtotal */}
                    </div>
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
        </div>
    );
};

export default Checkout;