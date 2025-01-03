import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import authReducer, { loginReducer } from './Auth/authReducer';
import sareeReducer  from './Sarees/sareeReducer'
import cartReducer from './Cart/cartReducer';
import customerAddressReducer from './Customeraddress/reducer';
import { forgotPasswordReducer } from './Auth/authReducer';  // Import forgot password reducer
import { resetPasswordReducer } from './Auth/authReducer';  // Import reset password reducer
import { contactFormReducer } from './contactus/contactReducer';
import {getcustomerAddressReducer} from './Customeraddress/reducer'
import {billingAddressReducer} from './Customeraddress/reducer'
// import productReducer from './Products/productReducer';
// import productByIdReducer from './ProductById/productByIdReduer';
// import { cartReducer } from './Cart/cartReducer';
// import { createCreateAddressReducer, getAddressReducer } from './Customer/Address/CustomerAddressReducer';
// import { adminUserListReducer } from './Admin/adminReducer';
// import { getUserAction } from './User/userAction';
// import { gateUserByIdReducer } from './User/userReducer';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,  // Uses localStorage to persist the store
//   whitelist: ['authData', 'cartData'], // Specify which reducers to persist (auth and cart in this case)
};

// Root reducer with persisted configuration
const rootReducer = {
  saree: sareeReducer,
//   productById: productByIdReducer,
  loginData:loginReducer, // Persisting authReducer
  cart: persistReducer(persistConfig, cartReducer),
  customerAddress: customerAddressReducer,
  forgotPassword: forgotPasswordReducer, // Adding forgot password reducer
  resetPassword: resetPasswordReducer,   // Adding reset password reducer
  contactForm: contactFormReducer,
  getcustomerAddress:getcustomerAddressReducer,
  billingAddress:billingAddressReducer,
  
userRegister:authReducer
};

// Configure the store with persisted reducers
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for non-serializable state
    }),
  devTools: process.env.NODE_ENV !== 'prod',
});

// Create a persistor for the store

// Optional: Subscribe to the store updates
store.subscribe(() => {
  console.log('Updated Store State1:', store.getState());
});

export const persistor = persistStore(store);
export default store;