// AddressForm.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddressForm = ({ currentAddress, setCurrentAddress, setShowAddressForm, saveAddress }) => {
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress(prev => ({ ...prev, [name]: value }));
};

const handleSaveAddress = () => {
    saveAddress(currentAddress); // Save the address (add or edit)
};

  return (

    <div>
    {/* Modal for editing or adding address */}
    <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '100px auto' }}>
            <h4>{currentAddress?.id ? 'Edit Address' : 'Add Address'}</h4>

            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={currentAddress.firstname || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={currentAddress.lastname || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            {/* Address and city fields */}
            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={currentAddress.address || ''}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={currentAddress.city || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={currentAddress.state || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>

            {/* Pincode and phone */}
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label>PIN Code</label>
                        <input
                            type="text"
                            name="pincode"
                            value={currentAddress.pincode || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="mobile"
                            value={currentAddress.mobile || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>


  {/* country  */}

  <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label>Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            value={currentAddress.landmark || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={currentAddress.country || ''}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-secondary" onClick={() => setShowAddressForm(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveAddress}>Save</button>
            </div>
        </div>
    </div>
</div>
//     <div className="address-form-popup">
//     <div className="popup-header">
//       <h3>{currentAddress ? 'Edit Address' : 'Add New Address'}</h3>
//       <FaTimes className="close-icon" onClick={closeAddressForm} />
//     </div>
//     <form>
//       <div className="input-row">
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fas fa-user'></i></span>
//           <input type="text" className="form-control" placeholder="First Name" aria-label="First Name" />
//         </div>
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fas fa-user'></i></span>
//           <input type="text" className="form-control" placeholder="Last Name" aria-label="Last Name" />
//         </div>
//       </div>
//       <div className="input-row">
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fa fa-map-marker'></i></span>
//           <input type="email" className="form-control" placeholder="Address" aria-label="Address" />
//         </div>

//         <div className="input-group">
//           <select className="form-select" required>
//             <option value="">Select State</option>
//             <option>Andhra Pradesh</option>
//             <option>Arunachal Pradesh</option>
//             <option>Assam</option>
//             <option>Bihar</option>
//             <option>Chhattisgarh</option>
//             <option>Goa</option>
//             <option>Gujarat</option>
//             <option>Haryana</option>
//             <option>Himachal Pradesh</option>
//             <option>Jharkhand</option>
//             <option>Karnataka</option>
//             <option>Kerala</option>
//             <option>Madhya Pradesh</option>
//             <option>Maharashtra</option>
//             <option>Manipur</option>
//             <option>Meghalaya</option>
//             <option>Mizoram</option>
//             <option>Nagaland</option>
//             <option>Odisha</option>
//             <option>Punjab</option>
//             <option>Rajasthan</option>
//             <option>Sikkim</option>
//             <option>Tamil Nadu</option>
//             <option>Telangana</option>
//             <option>Tripura</option>
//             <option>Uttar Pradesh</option>
//             <option>Uttarakhand</option>
//             <option>West Bengal</option>
//             <option>Delhi</option>
//             <option>Jammu and Kashmir</option>
//             <option>Ladakh</option>
//             <option>Chandigarh</option>
//           </select>
//         </div>
//       </div>
//       <div className="input-row">
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fas fa-city'></i></span>
//           <input type="text" className="form-control" placeholder="City" aria-label="City" />
//         </div>
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fa fa-map-pin'></i></span>
//           <input type="number" className="form-control" placeholder="Postal/Zip-Code" aria-label="Pincode" />
//         </div>
//       </div>
//       <div className="input-row">
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fas fa-envelope'></i></span>
//           <input type="email" className="form-control" placeholder="Email" aria-label="Email" />
//         </div>
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fa fa-phone'></i></span>
//           <input type="number" className="form-control" placeholder="Contact Number" aria-label="Contact Number" />
//         </div>
//       </div>
//       <div className="input-row">
//         <div className="input-group">
//           <span className="input-group-text" id="basic-addon1"><i className='fas fa-flag-o'></i></span>
//           <input type="email" className="form-control" placeholder="Country" aria-label="Email" />
//         </div>
//         <div className="input-group ">
//       <button type="submit" className="btn btn-primary">Submit</button>
//         </div>
//       </div>
  
  
//     </form>
//   </div>
  );
};

export default AddressForm;
