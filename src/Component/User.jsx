import React, { useEffect, useState } from 'react';
import './User.css';
import { FaTimes } from 'react-icons/fa';
import { FaPen, FaHeadset, FaBoxOpen, FaSearch, FaUser, FaAddressCard, FaShoppingBag, FaEye, FaLock, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AddressForm from '../common/AddressForm';

const User = () => {
 const [activeTab, setActiveTab] = useState('profile');
  const [isEditable, setIsEditable] = useState(false);
  const [loginUser, setLoginUser] = useState()
  const [addressesData, setAddressesData] = useState([]);
  const [phone, setPhone] =useState()
  
  const [error, setError] = useState(''); 
  const [addressList, setAddressList] = useState([]);
  const [profileData, setProfileData] = useState({
    username: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
    customer_id: loginUser?.id
  });

   // Fetch customer profile data based on customer_id
   const  fetchUserProfile = async (customerId) => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/customer/details/${customerId}`);
      response = await response.data?.data
      console.log("res",response)
      setAddressesData(response);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };


  const getLoginUser = () => {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    console.log("data",data)
    setLoginUser(data);
    if (data) {
        setProfileData((prevState) => ({
            ...prevState,
            customer_id: data.id,
        }));
     
        fetchUserProfile(data.id); 
    }
}

useEffect(() => {
    getLoginUser();
    return () => {
        window.removeEventListener('storage', getLoginUser);
    };
}, []);
const handleSave = async () => {
  try {
    let response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/auth/customer/profile/${addressesData.id}`, addressesData);
    let res = await response.data

    console.log('Profile updated successfully:', res.data);
    setIsEditable(false);
    setShowPopup(true);
    // setTimeout(() => setShowPopup(false), 2000);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};



  const [showPopup, setShowPopup] = useState(false); // For the success message

  const [showContactForm, setShowContactForm] = useState(false); // For the contact form
  const [showOrderDetails, setShowOrderDetails] = useState(false); // State for showing order details
const [showShippingAddress, setShowShippingAddress] = useState(false); // State for toggling shipping address
const [showBillingAddress, setShowBillingAddress] = useState(false); // State for toggling billing address

const toggleOrderDetails = () => {
  setShowOrderDetails(!showOrderDetails); // Toggle order details
};

const toggleShippingAddress = () => {
  setShowShippingAddress(!showShippingAddress); // Toggle shipping address
};

const toggleBillingAddress = () => {
  setShowBillingAddress(!showBillingAddress); // Toggle billing address
};

  const [showAddressForm, setShowAddressForm] = useState(false); // To show/hide popup
  const [currentAddress, setCurrentAddress] = useState(null); // To store the address being edited

  // Function to handle "Use a Different Address" - Opens a blank form
  const handleAddDifferentAddress = () => {
    setCurrentAddress({
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
       

    });
    setShowAddressForm(true); // Open modal
};


  const openAddressForm = (address) => {
    setCurrentAddress(address || { });
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setShowAddressForm(false);
    // setCurrentAddress(null);
  };

  const closeContactForm = () => {
    setShowContactForm(false);

  };

  const saveAddress = async (addressData) => {
    try {
        if (addressData.id) {
            // Update existing address
            let response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/address/update`, addressData);
            // let res = await response.data
            console.log("Updated Address:", response);
        } else {
            // Add new address
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/address/add`, addressData);
            let res = await response.data

            console.log("New Address Added:", res.data);
        }
        setShowAddressForm(false);
        getaddress()
    } catch (error) {
        console.error("Error in saving address:", error);
    }
};

const getaddress = async()=>{
  try {
     let data= await axios.get(`${process.env.REACT_APP_BASE_URL}/address/${loginUser?.id}`);
     let res = await data.data
     console.log("address",res)
     setAddressList(res.data)
  } catch (error) {
    console.error("Error in saving address:", error);
  }
}
    // Function to delete an address
    const deleteAddress = async (addressId) => {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/address/delete/${addressId}`);
        setAddressList((prevList) => prevList.filter((address) => address.id !== addressId)); // Update the list by removing the deleted address
        console.log("Address deleted successfully");
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    };
    
  const renderAddressForm = () => {
    // if (!showAddressForm) return null;

    return (
      <div>
          {/* Modal for Add/Edit Address */}
          {showAddressForm && (
                <AddressForm
                currentAddress={currentAddress}
                    setCurrentAddress={setCurrentAddress}
                    setShowAddressForm={setShowAddressForm}
                    saveAddress={saveAddress}
                />
            )}
      </div>
      
    );
  };


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setAddressesData((prevData) => ({ ...prevData, [id]: value })); // Update addressesData instead of profileData
       if (id === 'phone') {
        if (!/^\+91[0-9]{10}$/.test(value)) {
          setError('Please enter a valid 10-digit mobile number.');
        } else {
          setError(''); // Clear error if valid
        }
      }
  };

  useEffect(()=>{
    console.log("addressesData", addressesData)
       if(loginUser?.id){
        getaddress()
       }
  },[loginUser])
   

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="card">
            <div className="card-header">
              <h2>My Profile</h2>
              {isEditable ? (
                <FaTimes className="edit-icon" onClick={toggleEdit} />
              ) : (
                <FaPen className="edit-icon" onClick={toggleEdit} />
              )}
            </div>
            <div className="profile-section">
            {['firstname', 'lastname', 'email'].map((field) => (
              <div className="form-group" key={field}>
                <div className="form-floating">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="form-control"
                    id={field}
                    value={addressesData[field]}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              </div>
            ))}
              {/* Mobile Number Field */}
              <div className="form-group">
              <div className="form-floating">
                <PhoneInput
                  country={'in'}
                  value={addressesData.phone}
                  onChange={(phone) => handleInputChange({ target: { id: 'phone', value: phone } })}
                  disabled={!isEditable}
                  inputStyle={{ width: '100%', height: '40px' }}
                />
              </div>
              {error && (
                <small className="text-danger">{error}</small>
              )}
            </div>
              <div className="form-group">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    value={addressesData?.birthdate || ''} // Ensure it's not undefined
                    onChange={(e) => handleInputChange({ target: { id: 'birthdate', value: e.target.value } })}
                    disabled={!isEditable}
                  />
                  <label htmlFor="birthdate" >Birth Date</label>
                </div>
              </div>
              <div className="form-group">
                <div className="gender-options">Gender &nbsp;&nbsp;
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="gender-option">
                      <input
                        type="radio"
                        id="gender"
                        value={gender}
                        checked={addressesData.gender === gender}
                        onChange={() =>
                          setAddressesData({ ...addressesData, gender: gender })
                        }
                        disabled={!isEditable}
                      />{' '}
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
              {isEditable && (
                <button className="btn save-btn" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        );
      case 'address':
        console.log("list",addressList)
        return (
          <div className="card">
            <div className="card-header">
              <h2>Delivery Address</h2>
            </div>
            {/* Display the list of addresses */}
             {/* List of Addresses */}
             <div className="address-list">
                {addressList?.map((address, index) => (
                  <div key={index} className="address-card">
                    <div className="address-details">
                      <p><strong>{address.firstname} {address.lastname}</strong></p>
                      <p>{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                      <p>{address.country}</p>
                      <p>Phone: {address.mobile}</p>
                    </div>
                    <div className="icon-container">
                      <FaPen className="edit-icon" onClick={() => openAddressForm(address)} /> &nbsp;
                      <button className="trash-btn" onClick={() => deleteAddress(address.id)}>
                      <i className="fas fa-trash trash-icon"></i>
                    </button>
                    </div>
                  </div>
                    ))}
            </div>
             <br />
             <button className="btn w-40 " onClick={handleAddDifferentAddress}>Add New Address</button> {/* Button to add new address */}
          </div>
        );

        case 'orders':
          return (
            <div className="card">
              <h2>My Orders</h2>
              <div className="order-details">
                <div className="order-row">
                  <span>Order Date: <b>October 22, 2024</b></span>
                  <span>Order ID: <b>DSA-25603</b></span>
                </div>
                <div className="order-row">
                  <span>Total Item: <b>1</b></span>
                  <span>Payment: <b>Pending (Cash On Delivery (COD))</b></span>
                </div>
                <div className="order-row">
                  <span>Fulfillment Status: <b>Unfulfilled</b></span>
                  <span className="view-order-link-container">
                    <a href="#" className="view-order-link" onClick={toggleOrderDetails}>View Order</a>
                  </span>
                </div>
              </div>
              <div className="button-group">
                <button className="btn contact-us-btn" onClick={() => setShowContactForm(true)}>Contact Us</button>
                <button className="btn reorder-btn">Re-order</button>
              </div>
             
              {showContactForm && renderContactForm()} {/* Render contact form */}
        
              {/* Conditional rendering for order details */}
              {showOrderDetails && (
                <div className="order-detail-card">
                  <div className="product-info">
                    <img src="https://dsafashionwear.com/images/DSA_01/DSA_01.jpg" alt="Product" className="product-image w-40" />
                    <div className="product-name float-left"><b>Katan Silk With Silver Zari Work</b></div>
                  </div> <br /><br />
                  <div className="order-summary">
                    <div className="order-row">
                      <span>Sub Total:</span>
                      <span><b>Rs. 5,200.00</b></span>
                    </div>
                    <div className="order-row">
                      <span>Shipping Cost:</span>
                      <span><b>Rs. 0.00</b></span>
                    </div>
                    <div className="order-row">
                      <span>IGST 5.0%:</span>
                      <span><b>Rs. 247.62</b></span>
                    </div>
                    <div className="order-row">
                      <span>CGST 13.0%:</span>
                      <span><b>Rs. 0.00</b></span>
                    </div>
                  </div>
                  <div className="address-info float-left">
                    <div className="address-dropdown float-left">
                      <button className='float-left' onClick={toggleShippingAddress}><b>Address</b></button> <br /><br />
                      {showShippingAddress && (
                        <div className="address-details">
                          <p><b>Shipping Address:</b> Harsh Pandey, Near Chaya Churaha, Barabanki, Uttar Pradesh - 226021</p>
                          <p><b>Billing Address:</b> Harsh Pandey, Near Chaya Churaha, Barabanki, Uttar Pradesh - 226021</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
              )} <br />
               <div className="grand-total">
                <span className="grand-total-label">Grand Total:</span>
                <span className="grand-total-amount">Rs. 5,200.00</span>
              </div>
            </div>
          );
      case 'changePassword':
        return (
          <div className="card">
            <div className="card-header">
              <h2>Change Password</h2>
              {isEditable ? (
                <FaTimes className="edit-icon" onClick={toggleEdit} />
              ) : (
                <FaPen className="edit-icon" onClick={toggleEdit} />
              )}
            </div>
            <div className="form-group">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  disabled={!isEditable}
                />
                <label htmlFor="currentPassword">Current Password</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  disabled={!isEditable}
                />
                <label htmlFor="newPassword">New Password</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  disabled={!isEditable}
                />
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
              </div>
            </div>
            {isEditable && (
              <button className="btn save-btn" onClick={handleSave}>
                Save
              </button>
            )}
          </div>
        );
      case 'logout':
        return (
          <div className="card">
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <button className="btn logout-btn">Log Out</button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContactForm = () => {
    return (
      <div className="contact-form-popup">
        <div className="popup-header">
          <h3>Contact Us</h3>
          <FaTimes className="close-icon" onClick={closeContactForm} />
        </div>
        <form>
          <div className="input-row">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fas fa-user'></i></span>
              <input type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fas fa-user'></i></span>
              <input type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
              <input type="email" className="form-control" placeholder="Email" aria-label="Email" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fa fa-phone'></i></span>
              <input type="tel" className="form-control" placeholder="Mobile Number" aria-label="Mobile Number" />
            </div>
          </div>
          <div className="input-group">
            <select className="form-select" required>
              <option value="">Select Reason to Contact</option>
              <option value="1">Inquiry</option>
              <option value="2">Support</option>
              <option value="3">Feedback</option>
              <option value="4">Other</option>
            </select>
          </div> <br />
          <div className="input-group">
            <textarea className="form-control" placeholder="Message" required></textarea>
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1"><i className='fa fa-link'></i></span>
            <input type="url" className="form-control" placeholder="You can upload files on your drive and paste the link here." aria-label="File Link" />
          </div> <br />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );

  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  
  return (
    <div className="dashboard-container mt-48">
      <div className="sidebar">
      <h3 className="logo">{addressesData?.firstname && capitalizeFirstLetter(addressesData.firstname)}</h3>
        <ul className="menu">
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <FaUser /> My Profile
          </li>
          <li className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>
            <FaAddressCard /> Delivery Address
          </li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <FaShoppingBag /> My Orders
          </li>

          <li className={activeTab === 'changePassword' ? 'active' : ''} onClick={() => setActiveTab('changePassword')}>
            <FaLock /> Change Password
          </li>
          <li className={activeTab === 'logout' ? 'active' : ''} onClick={() => setActiveTab('logout')}>
            <FaSignOutAlt /> Log Out
          </li>
        </ul>
      </div>




      <div className="content-area">{renderContent()}</div>
      {renderAddressForm()}

      {/* Popup message */}
      {showPopup && (
        <div className="popup-message">
          <p>Your details saved successfully!</p>
        </div>
      )}
    </div>
  );
};

export default User ;