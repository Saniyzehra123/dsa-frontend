import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAddress } from '../Redux/Customeraddress/action';
import {billingCustomerAddress } from '../Redux/Customeraddress/action'
import { useLocation } from 'react-router-dom';
import Select from 'react-select'; // For states dropdown
import PhoneInput from 'react-phone-input-2'; // For mobile number input
import 'react-phone-input-2/lib/style.css'; // CSS for phone input
import axios from 'axios';


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
    const {isLoding, billing_address, error} = useSelector((store)=>store?.billingAddress);
    const address = useSelector((store)=>store?.getcustomerAddress);
    const { products, discount } = location.state || { products: [], discount: 0 }; // Default to empty array and zero discount
    const [loginUser, setLoginUser]= useState()
    const [useDifferentAddress, setUseDifferentAddress] = useState(false);
    const [addressList,setAddressList]= useState([]);
    const [showAccount, setShowAccount] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const [paymentOption, setPaymentOption] = useState('cod'); 
    const [addAddressId, setAddAddressId] = useState(0);
    const [orderId, setOrderId] = useState(0);
    const [billingAddressId, setBillingAddressId] = useState(0);
    
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "Saniya",
        lastName: "Zehra",
        address: "310/290 C1 bajpai nagar, jajmau",
        city: "Kanpur",
        state: "Uttar Pradesh",
        pinCode: "208010",
        phone: "+916391377235"
    });

    // Handle payment option change
        const handlePaymentChange = (e) => {
            setPaymentOption(e.target.value);
        };
       
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalAddress, setModalAddress] = useState();


    // Function to handle "Use a Different Address" - Opens a blank form
    const handleUseDifferentAddress = () => {
        setModalAddress({
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
            phone: "",
            landmark:"",
            country:""
        });
        setShowModal(true); // Open modal
    };

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
        country: '',
        customer_id: loginUser?.id,
        isbilling: 0
    });

    const [billingAddress, setBillingAddress] = useState({
        firstname: '',
        email: '',
        lastname: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        mobile: '',
        country: '',
        customer_id: loginUser?.id,
        isbilling: 1
    });

     const handleAddressChange = (e) => {
        setUseDifferentAddress(e.target.value === 'different');
    };


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

   
    const getCusAddressList=async(customerId)=>{
        try {
            let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/address/${customerId}`)
            let data = await res.data?.data;
            console.log("list",data);
            setAddressList(data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const addShippingAddress = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/address/add`, formData);
            const savedData = await res.data?.data;
            console.log("Shipping Address ID",formData);
            setAddAddressId(savedData.id); // Set saved address ID
        } catch (error) {
            console.error("Error adding shipping address:", error);
        }
    };

    const addBillingAddress = async (data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/address/add`, data);
            const savedData = await res.data?.data;
            console.log("Billing Address ID", data);
            setBillingAddressId(savedData.id); // Set saved billing address ID
        } catch (error) {
            console.error("Error adding billing address:", error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate Pin Code
        if (!validatePinCode(formData.pincode)) {
            alert('Please enter a valid pin code.');
            return;
        }
        try {
            // Submit the shipping address first
            await addShippingAddress();
            // Check if the user wants to use a different billing address
            if (useDifferentAddress) {
                addBillingAddress(billingAddress);
            }else{
               await addBillingAddress({
                                ...formData,
                                isbilling: 1 // Billing address, same as shipping
                            });
                
            }
            console.log("formData", formData, billingAddress)
        } catch (error) {
            console.error("Error submitting address:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };
    const getLoginUser = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        setLoginUser(data);
        if (data) {
            setFormData((prevState) => ({
                ...prevState,
                customer_id: data.id,
            }));
            setBillingAddress((prevState) => ({
                ...prevState,
                customer_id: data.id,
            }));
            getCusAddressList(data.id)
        }
    }
    const createOrder=async()=>{
        const dataObj={
            address_id:addAddressId,
            billing_id:billingAddressId,
            customer_id:loginUser?.id
        }
        try {
            let res = await axios.post(`${process.env.PUBLIC_URL}/order/add`, dataObj)
            let data = await res.data?.data
            setOrderId(data?.orderId)
        } catch (error) {
            alert("Something went wrong"); 
        }
    }

    useEffect(() => {
        getLoginUser();
        return () => {
          window.removeEventListener('storage', getLoginUser);
        };
      }, []);
    
    useEffect(()=>{
        if(billing_address?.data?.addressId>0 && address?.address?.data?.addressId>0){
            alert("order done sucessfullly")
        }
        console.log("billing_address", billing_address, address)
    },[dispatch, billing_address])

    return (
        <div className="container mt-44 text-justify">
        <h2 className="text-center">Checkout</h2>
        <div className="row">
            {/* Col-md-8 for the form */}
            <div className="col-md-8">
            <form onSubmit={handleSubmit}>
        <h4>Contact Information</h4>
        
 {/* //////get shipp///// */}
                <h4 onClick={() => setShowAccount(!showAccount)} style={{ cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Account
                            <i className={`fas ${showAccount ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '8px' }}></i>
                        </h4>
                        {showAccount && (
                            <a href="#" className="text-primary">Log out</a>
                        )}
                        <p style={{ fontSize: '0.9rem' }}>zsaniya973@gmail.com</p>
                        <hr />

                       {
                        addressList?.length>0  ? <React.Fragment>
                         <h4 onClick={() => setShowShipping(!showShipping)} style={{ cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Ship to
                            <i className={`fas ${showShipping ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '8px' }}></i>
                        </h4>
                        {showShipping && (
                            <div>
                                {addressList.map((address) => (
                                    <div key={address.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <p style={{ fontSize: '0.9rem', marginRight: '8px' }}>
                                            {`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state} - ${address.pincode}, Phone: ${address.mobile}`}
                                        </p>
                                        <i className="fas fa-pen" onClick={() => {
                                            setModalAddress(address); // Set the current address for editing
                                            setShowModal(true); // Open modal
                                        }} style={{ cursor: 'pointer' }}></i>
                                    </div>
                                ))}
                                {/* New Anchor for "Use a Different Address" */}
                                <a href="#" onClick={handleUseDifferentAddress} style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}>
                                    + Use a Different Address
                                </a>
                            </div>
                        )}
                        <hr /></React.Fragment> :<React.Fragment>
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
                                    <label htmlFor="country">Country</label>
                                </div>
                            </div>

                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="saveInfo" />
                                <label className="form-check-label" htmlFor="saveInfo">Save this information for next time</label>
                            </div>
                            <hr />
                        </React.Fragment>
                       }


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
                <label htmlFor="sameAddress" className="ms-2">Same as your shipping address</label>
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
                            <input type="text" className="form-control" id="billingFirstName" 
                                name="firstname"
                                value={billingAddress?.firstname}
                                onChange={handleBillingChange}
                                placeholder="First Name"
                                required
                            />
                            <label htmlFor="billingFirstName">First Name</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="billingLastName"
                                name="lastname"
                                value={billingAddress?.lastname}
                                onChange={handleBillingChange}
                                placeholder="Last Name"
                                required />
                            <label htmlFor="billingLastName">Last Name</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="billingAddress"
                            name="address"
                            value={billingAddress?.address}
                            onChange={handleBillingChange}
                            placeholder="Billing Address" required />
                        <label htmlFor="billingAddress">Billing Address</label>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="form-floating">
                        <input type="text" className="form-control" id="billingLandmark"
                            name="landmark"
                            value={billingAddress?.landmark}
                            onChange={handleBillingChange}
                            placeholder="Nearby Landmark" />
                        <label htmlFor="billingLandmark">Nearby Landmark</label>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="billingCity"
                                name="city"
                                value={billingAddress?.city}
                                onChange={handleBillingChange}
                                placeholder="City" required />
                            <label htmlFor="billingCity">City</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <Select
                                value={stateOptions.find(option => option.value === billingAddress.state)}
                                onChange={handleBillingStateChange}
                                options={stateOptions}
                                placeholder="Select a State"
                                isClearable={true}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="billingPinCode"
                                name="pincode"
                                value={billingAddress?.pincode}
                                onChange={handleBillingChange}
                                placeholder="Pincode" required />
                            <label htmlFor="billingPinCode">Pin Code</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <PhoneInput
                        country={'in'}
                        value={billingAddress?.mobile}
                        onChange={handleBillingMobileChange}
                        placeholder="Mobile Number"
                        required
                    />
                </div>

                <div className="col-md-3">
            <div className="form-floating">
                <input type="text" className="form-control" id="country"
                    name="country"
                    value={billingAddress?.country}
                    onChange={handleBillingChange}
                    placeholder="Country" required />
                <label htmlFor="country">Country</label>
            </div>
        </div>
            </div>
        )}
        <hr />

           {/* Billing Address Section */}
           <h4>Payment Options</h4><br />

                <div className="mb-3">
                    <div>
                    <input
                        type="radio"
                        id="cod"
                        name="paymentOption"
                        value="cod"
                        onChange={handlePaymentChange}
                        checked={paymentOption === 'cod'}
                    />
                          <label htmlFor="cod" className="ms-2">Cash On Delivery</label>
                    </div>
                   
                </div>
        <hr/>

        <button type="submit" className="btn btn-primary w-100 mt-3">Pay now</button>
    </form>

            </div>

                {/* Col-md-4 for the cart summary */}
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    {products.map(product => (
                        <div className="card mb-3" key={product.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <img src={product.main_image_url} className="card-img-left" alt="Product Image" style={{ width: '100px', height: 'auto' }} />
                            <div className="card-body">
                                <h6 className="card-title">{product.saree_name}</h6>
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
                                <div className="col-md-6">
                                    <label>Landmark</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={modalAddress.landmark}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={modalAddress.country}
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
