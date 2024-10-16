import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomerAddress } from '../Redux/Customeraddress/action';
import { useLocation } from 'react-router-dom';
import Select from 'react-select'; // For states dropdown
import PhoneInput from 'react-phone-input-2'; // For mobile number input
import 'react-phone-input-2/lib/style.css'; // CSS for phone input


const stateOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
];

const Checkout = () => {
    const location = useLocation(); // Get the state passed from Cart
    const dispatch = useDispatch();
    const { products, discount } = location.state || { products: [], discount: 0 }; // Default to empty array and zero discount
    const [loginUser, setLoginUser]= useState()

    const calculateSubtotal = () => {
        if (!Array.isArray(products)) {
            return 0;
        }
        return products.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0);
    };

    const subtotal = calculateSubtotal(); // Original subtotal
    const discountedSubtotal = subtotal - (subtotal * discount); // Subtotal after discount
    const totalPrice = discountedSubtotal + 40; // Add shipping charges

    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        mobile: '',
        country:'',
        customer_id:loginUser?.id
    });

    const [billingAddress, setBillingAddress] = useState({
        address: '',
        landmark: '',
        city: '',
        state: '',
        pinCode: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleStateChange = (selectedOption) => {
        setFormData((prevState) => ({
            ...prevState,
            state: selectedOption.value,
        }));
    };

    const handleBillingStateChange = (selectedOption) => {
        setBillingAddress((prevState) => ({
            ...prevState,
            state: selectedOption.value,
        }));
    };

    const handleMobileChange = (value) => {
        setFormData((prevState) => ({
            ...prevState,
            mobile: value,
        }));
    };

    const handleBillingMobileChange = (value) => {
        setBillingAddress((prevState) => ({
            ...prevState,
            mobile: value,
        }));
    };

    const validatePinCode = (pinCode) => {
        // Example validation: 6 digits long
        const pinCodeRegex = /^[1-9][0-9]{5}$/;
        return pinCodeRegex.test(pinCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Pin code validation
        if (!validatePinCode(formData.pincode)) {
            alert('Please enter a valid pin code.');
            return;
        }
        console.log("data", formData)
        dispatch(addCustomerAddress(formData));
    };
    const getLoginUser = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        console.log("customr user", data)
        formData["customer_id"]=data?.id;
        setLoginUser(data);
      };

    useEffect(() => {
        getLoginUser();
        return () => {
          window.removeEventListener('storage', getLoginUser);
        };
      }, []);

    return (
        <div className="container mt-44 text-justify">
        <h2 className="text-center">Checkout</h2>
        <div className="row">
            {/* Col-md-8 for the form */}
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    <h4>Contact Information</h4>
                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-check mt-2">
                            <input type="checkbox" className="form-check-input" id="newsOffers" />
                            <label className="form-check-label" htmlFor="newsOffers">Email me with news and offers</label>
                        </div>
                    </div>

                    <h4>Delivery Information</h4>
                    <div className="mb-3 row">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="firstname"
                                    name="firstname"
                                    value={formData?.firstname}
                                    onChange={handleChange}
                                    placeholder="First Name" required />
                                <label htmlFor="firstname">First Name</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="lastname"
                                    name="lastname"
                                    value={formData?.lastname}
                                    onChange={handleChange}
                                    placeholder="Last Name" required />
                                <label htmlFor="lastname">Last Name</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="address"
                                name="address"
                                value={formData?.address}
                                onChange={handleChange}
                                placeholder="Address" required />
                            <label htmlFor="address">Address</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="landmark"
                                name="landmark"
                                value={formData?.landmark}
                                onChange={handleChange}
                                placeholder="Nearby Landmark" />
                            <label htmlFor="landmark">Nearby Landmark</label>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col-md-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="city"
                                    name="city"
                                    value={formData?.city}
                                    onChange={handleChange}
                                    placeholder="City" required />
                                <label htmlFor="city">City</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Select
                                    options={stateOptions}
                                    onChange={handleStateChange}
                                    placeholder="Select State"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="pincode"
                                    name="pincode"
                                    value={formData?.pincode}
                                    onChange={handleChange}
                                    placeholder="Pin Code" required />
                                <label htmlFor="pincode">Pin Code</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <PhoneInput
                            country={'in'}
                            value={formData?.mobile}
                            onChange={handleMobileChange}
                            placeholder="Mobile Number"
                            required
                        />
                    </div>

                    <div className="col-md-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="country"
                                    name="country"
                                    value={formData?.country}
                                    onChange={handleChange}
                                    placeholder="Country" required />
                                <label htmlFor="country">City</label>
                            </div>
                        </div>

                    <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="saveInfo" />
                            <label className="form-check-label" htmlFor="saveInfo">Save this information for next time</label>
                        </div>
                        <hr />

{/* 
                    <h4>Billing Address</h4>

                    <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="saveInfo" />
                            <label className="form-check-label" htmlFor="saveInfo">Same as above address.</label>
                        </div>

                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="billingAddress"
                                name="address"
                                value={billingAddress.address}
                                onChange={handleBillingChange}
                                placeholder="Billing Address"   />
                            <label htmlFor="billingAddress">Billing Address</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="billingLandmark"
                                name="landmark"
                                value={billingAddress.landmark}
                                onChange={handleBillingChange}
                                placeholder="Billing Landmark" />
                            <label htmlFor="billingLandmark">Billing Landmark</label>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col-md-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="billingCity"
                                    name="city"
                                    value={billingAddress.city}
                                    onChange={handleBillingChange}
                                    placeholder="Billing City"   />
                                <label htmlFor="billingCity">Billing City</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <Select
                                    options={stateOptions}
                                    onChange={handleBillingStateChange}
                                    placeholder="Select Billing State"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="billingPinCode"
                                    name="pinCode"
                                    value={billingAddress.pinCode}
                                    onChange={handleBillingChange}
                                    placeholder="Billing Pin Code"  />
                                <label htmlFor="billingPinCode">Billing Pin Code</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <PhoneInput
                            country={'in'}
                            value={billingAddress.mobile}
                            onChange={handleBillingMobileChange}
                            placeholder="Billing Mobile Number"
                           
                        />
                    </div> */}

                    <button type="submit" className="btn btn-primary">Continue to Payment</button>
                </form>
            </div>

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
