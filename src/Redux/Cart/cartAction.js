
// src/Redux/Cart/cartAction.js

import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  GET_CART_FAILURE,
} from './actionType';


export const addToCart = (payload) => async (dispatch, getState) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, payload);
    
    console.log('Dispatching ADD_TO_CART action with payload:', payload);
    dispatch({
      type: ADD_TO_CART,
      payload,
    });

    const cartState = getState().cart.cartItems;
    console.log('Updated Cart State after dispatch:', cartState);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};


// Action Creator for Adding to Cart
// export const addToCart = (payload) => async (dispatch, getState) => {
//   try {
//     // Send a request to your backend API to add the item to the cart
//     await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, payload);
    
//     // Dispatch action to add item to Redux state
//     dispatch({
//       type: ADD_TO_CART,
//       payload,
//     });

//     // Check the updated cart state after adding the item
//     const cartState = getState().cart.cartItems;
//     console.log('Updated Cart State:', cartState);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// };

// Get Cart
// export const getCart = (customerId) => async (dispatch) => {
//   dispatch({ type: GET_CART_REQUEST });
  
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/view/${customerId}`);
//     console.log("Cart fetched from API:", response.data); // Log the response to ensure it's coming correctly

//     dispatch({
//       type: GET_CART_SUCCESS,
//       payload: response.data, // Ensure that this matches the expected cart format
//     });
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     dispatch({
//       type: GET_CART_FAILURE,
//       payload: error.message,
//     });
//   }
// };
// src/Redux/Cart/cartAction.js
export const getCart = (customerId) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/view/${customerId}`);
    console.log('Cart Data:', response.data); // Add this line for debugging
    dispatch({
      type: GET_CART_SUCCESS,
      payload: response.data.data, // Make sure this matches the structure of your API response
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.message,
    });
  }
};



// Get Cart
// export const getCart = (customerId) => async (dispatch) => {
//   dispatch({ type: GET_CART_REQUEST });
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/view/${customerId}`);
//     dispatch({
//       type: GET_CART_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_CART_FAILURE,
//       payload: error.message,
//     });
//   }
// };

// Update Cart Quantity
export const updateCartQuantity = (payload) => async (dispatch) => {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/cart/update`, payload);
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload,
    });
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

// Remove from Cart
export const removeFromCart = (cartId) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/remove/${cartId}`);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: cartId,
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// import axios from 'axios';
// import {
//   ADD_TO_CART,
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
//   GET_CART_SUCCESS,
//   GET_CART_REQUEST,
//   GET_CART_FAILURE,
// } from './actionType';

 
// export const addToCart = (payload) => async (dispatch, getState) => {
//   try {
//     await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, payload);
//     dispatch({
//       type: ADD_TO_CART,
//       payload,
//     });

//     // Check the updated cart state
//     const cartState = getState().cart.cartItems;
//     console.log('Updated Cart State:', cartState);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// };

 

// // Add to Cart
// // export const addToCart = (payload) => async (dispatch) => {
// //   try {
// //     await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, payload);
// //     dispatch({
// //       type: ADD_TO_CART,
// //       payload,
// //     });
// //   } catch (error) {
// //     console.error('Error adding to cart:', error);
// //   }
// // };

// // Get Cart
// export const getCart = (customerId) => async (dispatch) => {
//   dispatch({ type: GET_CART_REQUEST });
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/view/${customerId}`);
//     dispatch({
//       type: GET_CART_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_CART_FAILURE,
//       payload: error.message,
//     });
//   }
// };

// // Update Cart Quantity
// export const updateCartQuantity = (payload) => async (dispatch) => {
//   try {
//     await axios.patch(`${process.env.REACT_APP_BASE_URL}/cart/update`, payload);
//     dispatch({
//       type: UPDATE_CART_QUANTITY,
//       payload,
//     });
//   } catch (error) {
//     console.error('Error updating cart:', error);
//   }
// };

// // Remove from Cart
// export const removeFromCart = (cartId) => async (dispatch) => {
//   try {
//     await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/remove/${cartId}`);
//     dispatch({
//       type: REMOVE_FROM_CART,
//       payload: cartId,
//     });
//   } catch (error) {
//     console.error('Error removing from cart:', error);
//   }
// };
