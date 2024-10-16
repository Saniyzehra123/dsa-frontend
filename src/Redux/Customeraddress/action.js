import axios from "axios";
import {
  ADD_CUSTOMER_ADDRESS_REQUEST,
  ADD_CUSTOMER_ADDRESS_SUCCESS,
  ADD_CUSTOMER_ADDRESS_FAILURE,
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

