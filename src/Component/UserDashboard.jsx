import React, { useState } from 'react';
import './UserDashboard.css';
import { FaTimes } from 'react-icons/fa';
import { FaPen, FaHeadset, FaBoxOpen, FaSearch, FaUser, FaAddressCard, FaShoppingBag, FaEye, FaLock, FaSignOutAlt } from 'react-icons/fa';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Bathroom',
    lastName: 'Renovators',
    email: 'contact.bathroomrenovators@gmail.com',
    mobile: '123 45 678 90',
    birthdate: '1990-01-01',
    gender: 'Male'
  });


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

  const openAddressForm = (address) => {
    setCurrentAddress(address || { name: '', street: '', city: '', state: '', zip: '', country: '' });
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setShowAddressForm(false);
    setCurrentAddress(null);
  };



  const closeContactForm = () => {
    setShowContactForm(false);

  };

  

  const renderAddressForm = () => {
    if (!showAddressForm) return null;

    return (
      <div className="address-form-popup">
        <div className="popup-header">
          <h3>{currentAddress ? 'Edit Address' : 'Add New Address'}</h3>
          <FaTimes className="close-icon" onClick={closeAddressForm} />
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
              <span className="input-group-text" id="basic-addon1"><i className='fa fa-map-marker'></i></span>
              <input type="email" className="form-control" placeholder="Address" aria-label="Address" />
            </div>

            <div className="input-group">
              <select className="form-select" required>
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
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fas fa-city'></i></span>
              <input type="text" className="form-control" placeholder="City" aria-label="City" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fa fa-map-pin'></i></span>
              <input type="number" className="form-control" placeholder="Postal/Zip-Code" aria-label="Pincode" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fas fa-envelope'></i></span>
              <input type="email" className="form-control" placeholder="Email" aria-label="Email" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fa fa-phone'></i></span>
              <input type="number" className="form-control" placeholder="Contact Number" aria-label="Contact Number" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1"><i className='fas fa-flag-o'></i></span>
              <input type="email" className="form-control" placeholder="Country" aria-label="Email" />
            </div>
            <div className="input-group ">
          <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
      
      
        </form>
      </div>
    );
  };


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleSave = () => {
    setIsEditable(false);
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

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
              {['firstName', 'lastName', 'email'].map((field) => (
                <div className="form-group" key={field}>
                  <div className="form-floating">
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      id={field}
                      value={profileData[field]}
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
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={profileData.mobile}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label htmlFor="mobile">Mobile Number</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="birthdate"
                    value={profileData.birthdate}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                  <label htmlFor="birthdate">Birthdate</label>
                </div>
              </div>
              <div className="form-group">
                <div className="gender-options">Gender &nbsp;&nbsp;
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="gender-option">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={profileData.gender === gender}
                        onChange={() =>
                          setProfileData({ ...profileData, gender: gender })
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
  return (
    <div className="card">
      <div className="card-header">
        <h2>Delivery Address</h2>
      </div>
      {/* Display the list of addresses */}
      <div className="address-list">
        {[
          { 
            firstname: 'Harsh', 
            lastname: 'Pandey', 
            address: 'Near Chaya Churaha', 
            city: 'Barabanki', 
            state: 'Uttar Pradesh', 
            zip: '226021', 
            country: 'India', 
            email: 'harshpandeylucifer@gmail.com', 
            contact: '9555299718' 
          }
          // More addresses can be added here
        ].map((address, index) => (
          <div key={index} className="address-card">
            <div className="address-details">
              <p><strong>{address.firstname} {address.lastname}</strong></p>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.zip}</p>
              <p>{address.country}</p>
              <p>{address.email}</p>
              <p>{address.contact}</p>
            </div>
            <div className="icon-container">
              <FaPen className="edit-icon text-black" onClick={() => openAddressForm(address)} /> &nbsp;
               <button><i className='fas fa-trash'></i></button> 
       
            </div>
          </div>
        ))}
      </div>
      
      <br />
      <button className="btn w-40" onClick={() => openAddressForm(null)}>Add New Address</button>
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

  
  return (
    <div className="dashboard-container mt-48">
      { (showAddressForm || showContactForm) && <div className="popup-overlay" /> }
      <div className="sidebar">
        <h3 className="logo">Harsh</h3>
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
      {showContactForm && renderContactForm()} {/* Render contact form */}
  
      {/* Popup message */}
      {showPopup && (
        <div className="popup-message">
          <p>Your details saved successfully!</p>
        </div>
      )}
    </div>
  );
  

};



export default UserDashboard;
