import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './actionType';

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

// Adjusting loginReducer to handle default state
export const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
        error: null,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload || 'Error in login user', // Keep this as fallback
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  console.log('type',payload)
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isAuthenticated: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
        error: null,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload || 'Error in regitering user',
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
