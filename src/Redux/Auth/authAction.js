import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './actionType';
import axios from 'axios';

// Login actions
export const userLoginAction = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/customer/login` , { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: error?.response?.data.message|| error?.message });
  }
};

// Register actions
export const userRegisterAction = (data) => async (dispatch) => {
 
  console.log("val", data)
    try {
      // Dispatch request action
      dispatch({ type: USER_REGISTER_REQUEST });
    
      // API call for registration
      let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/customer/register`, data);
       res =await res.data;
      // Dispatch success action
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: res
      });
    } catch (error) {
      // Dispatch failure action
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

 
