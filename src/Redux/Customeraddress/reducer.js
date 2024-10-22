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
  
  const initialState = {
    isLoading: false,
    address: null,
    error: null
    
  };
  const billingState = {
    isLoading: false,
    billing_address:null,
    error: null,
  };
  
  const getinitialState = {
    isLoading: false,
    error: null,
    addresses: [],
  };
  
  const customerAddressReducer = (state = initialState, action) => {
    const {type,payload} = action
    switch (type) {
      case ADD_CUSTOMER_ADDRESS_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case ADD_CUSTOMER_ADDRESS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          address: payload,
        };
      case ADD_CUSTOMER_ADDRESS_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload || 'Error in message',
        };
      default:
        return state;
    }
  };
  
  export default customerAddressReducer;
  

 export const getcustomerAddressReducer = (state = getinitialState, action) => {
    switch (action.type) {
      case GET_CUSTOMER_ADDRESSES_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case GET_CUSTOMER_ADDRESSES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          addresses: action.payload.data, // Assuming `data` contains the addresses array
          error: null,
        };
  
      case GET_CUSTOMER_ADDRESSES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };

 
  export const  billingAddressReducer = (state =  billingState, action) => {
    const {type,payload} = action
    switch (type) {
      case ADD_BILLING_ADDRESSES_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case ADD_BILLING_ADDRESSES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          billing_address: payload,
        };
      case ADD_BILLING_ADDRESSES_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload || 'Error in message',
        };
      default:
        return state;
    }
  };
  
 