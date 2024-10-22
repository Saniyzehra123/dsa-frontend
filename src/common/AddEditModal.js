import React from 'react'

const AddEditModal = ({ modalAddress, setModalAddress, setShowModal, saveAddress }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAddress = () => {
        saveAddress(modalAddress); // Handle saving the address (either add or edit)
    };

    return (
        <div>
            {/* Modal for editing or adding address */}
            <div className="modal" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '100px auto' }}>
                    <h4>{modalAddress?.id ? 'Edit Address' : 'Add Address'}</h4>
                    
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={modalAddress.firstname || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={modalAddress.lastname || ''}
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
                            value={modalAddress.address || ''}
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
                                    value={modalAddress.city || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={modalAddress.state || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>PIN Code</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={modalAddress.pincode || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={modalAddress.mobile || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Landmark</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={modalAddress.landmark || ''}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label>Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={modalAddress.country || ''}
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
        </div>
    );
};

export default AddEditModal;

