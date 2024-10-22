import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE

 } from './actionType';

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  message: null,
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


export const forgotPasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload || 'Error in sending forgot password email',
      };
    default:
      return state;
  }
};


export const resetPasswordReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload || 'Error in resetting password',
      };
    default:
      return state;
  }
};