import {
    ADD_CUSTOMER_ADDRESS_REQUEST,
    ADD_CUSTOMER_ADDRESS_SUCCESS,
    ADD_CUSTOMER_ADDRESS_FAILURE,
  } from "./actionType";
  
  const initialState = {
    isLoading: false,
    address: null,
    error: null,
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
  