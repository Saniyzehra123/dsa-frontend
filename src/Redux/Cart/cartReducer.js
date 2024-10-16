import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  GET_CART_SUCCESS,
  GET_CART_REQUEST,
  GET_CART_FAILURE,
} from './actionType';

const initialState = {
  isLoading: false,
  cartItems: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_SUCCESS:
      console.log("Cart items in reducer:", action.payload); 
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload, // Load cart items from server
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      case ADD_TO_CART:
        // Avoid adding duplicate items in the cart
        const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          };
        }
    // case ADD_TO_CART:
    //   // Avoid adding duplicate items in the cart
    //   const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
    //   if (existingItem) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((item) =>
    //         item.id === action.payload.id
    //           ? { ...item, quantity: item.quantity + 1 }
    //           : item
    //       ),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
    //     };
    //   }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.cart_id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;



// import {
//     ADD_TO_CART,
//     REMOVE_FROM_CART,
//     UPDATE_CART_QUANTITY,
//     GET_CART_SUCCESS,
//     GET_CART_REQUEST,
//     GET_CART_FAILURE,
//   } from './actionType';
  
//   const initialState = {
//     isLoading: false,
//     cartItems: [],
//     error: null,
//   };
  
//   const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case GET_CART_REQUEST:
//         return {
//           ...state,
//           isLoading: true,
//         };
//       case GET_CART_SUCCESS:
//         return {
//           ...state,
//           isLoading: false,
//           cartItems: action.payload,
//         };
//       case GET_CART_FAILURE:
//         return {
//           ...state,
//           isLoading: false,
//           error: action.payload,
//         };
//       case ADD_TO_CART:
//         return {
//           ...state,
//           cartItems: [...state.cartItems, action.payload],
//         };
//       case REMOVE_FROM_CART:
//         return {
//           ...state,
//           cartItems: state.cartItems.filter((item) => item.id !== action.payload),
//         };
//       case UPDATE_CART_QUANTITY:
//         return {
//           ...state,
//           cartItems: state.cartItems.map((item) =>
//             item.id === action.payload.cart_id
//               ? { ...item, quantity: action.payload.quantity }
//               : item
//           ),
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default cartReducer;
  