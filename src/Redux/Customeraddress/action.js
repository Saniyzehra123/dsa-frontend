import axios from "axios";
import {
  ADD_CUSTOMER_ADDRESS_REQUEST,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  ADD_CUSTOMER_ADDRESS_FAILURE,
  GET_CUSTOMER_ADDRESSES_REQUEST, 
  GET_CUSTOMER_ADDRESSES_SUCCESS, 
  GET_CUSTOMER_ADDRESSES_FAILURE,
  ADD_BILLING_ADDRESSES_REQUEST,
  ADD_BILLING_ADDRESSES_SUCCESS,
  ADD_BILLING_ADDRESSES_FAILURE,
} from "./actionType";

// Action creators
const addCustomerAddressRequest = () => ({
  type: ADD_CUSTOMER_ADDRESS_REQUEST,
});

const addCustomerAddressSuccess = (payload) => ({
  type: ADD_CUSTOMER_ADDRESS_SUCCESS,
  payload,
});

const addCustomerAddressFailure = (error) => ({
  type: ADD_CUSTOMER_ADDRESS_FAILURE,
  payload: error,
});


// Action creators
const getCustomerAddressesRequest = () => ({
  type: GET_CUSTOMER_ADDRESSES_REQUEST,
});

const getCustomerAddressesSuccess = (payload) => ({
  type: GET_CUSTOMER_ADDRESSES_SUCCESS,
  payload,
});

const getCustomerAddressesFailure = (error) => ({
  type: GET_CUSTOMER_ADDRESSES_FAILURE,
  payload: error,
});

const billingCustomerAddressRequest = () =>({
  type:ADD_BILLING_ADDRESSES_REQUEST
  

});

const billingCustomerAddressSuccess = (payload) =>({
  type:ADD_BILLING_ADDRESSES_SUCCESS,
  payload

});

const billingCustomerAddressFailure = (error) =>({
  type:ADD_BILLING_ADDRESSES_FAILURE,
  payload: error

});
// Thunk action to save customer address to the backend
export const addCustomerAddress = (addressData) => async (dispatch) => {
  dispatch(addCustomerAddressRequest());
  
  try {
    console.log("action", process.env.REACT_APP_BASE_URL, addressData);
    
    // Make the POST request and destructure data from the response
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/address/add`, addressData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("response", response);
    
    // Dispatch success action with the data
    dispatch(addCustomerAddressSuccess(response?.data));
  } catch (error) {
    // Dispatch failure action with the error
    dispatch(addCustomerAddressFailure(error));
  }
};


export const billingCustomerAddress = (billingData) => async (dispatch) => {
  dispatch(billingCustomerAddressRequest());
  
  try {
    console.log("action billing", process.env.REACT_APP_BASE_URL, billingData);
    
    // Make the POST request and destructure data from the response
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/address/add`, billingData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("response billing", response);
    
    // Dispatch success action with the data
    dispatch(billingCustomerAddressSuccess(response?.data));
  } catch (error) {
    // Dispatch failure action with the error
    dispatch(billingCustomerAddressFailure(error));
  }
};

// Thunk action to get customer addresses from the backend
export const getCustomerAddresses = (customerId) => async (dispatch) => {
  dispatch(getCustomerAddressesRequest());

  try {
    console.log("Fetching addresses for customer", customerId);

    // Make the GET request to retrieve addresses for a customer
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/address/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("response", response);

    // Dispatch success action with the retrieved data
    dispatch(getCustomerAddressesSuccess(response?.data));
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch(getCustomerAddressesFailure(error.message || "Failed to fetch addresses"));
  }
};


