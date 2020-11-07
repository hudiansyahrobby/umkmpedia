import * as CART from '../constants/cartConstants';

const initialState = {
  message: '',
  loading: false,
  carts: [],
  totalPrice: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART.ADD_PRODUCT_TO_CART_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.ADD_PRODUCT_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        carts: state.carts.concat(action.payload.cart),
        totalPrice: action.payload.totalPrice,
      };
      break;
    case CART.ADD_PRODUCT_TO_CART_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;
    case CART.GET_PRODUCTS_CART_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.GET_PRODUCTS_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        carts: action.payload.carts,
        totalPrice: action.payload.totalPrice,
      };

      break;
    case CART.GET_PRODUCTS_CART_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case CART.DELETE_PRODUCT_FROM_CART_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.DELETE_PRODUCT_FROM_CART_SUCCESS:
      const deletedProduct = state.carts.filter((cart) => cart._id === action.payload.productId);
      state = {
        ...state,
        loading: false,
        carts: state.carts.filter((cart) => cart._id !== action.payload.productId),
        totalPrice: state.totalPrice - deletedProduct[0].price * deletedProduct[0].quantity,
      };
      break;
    case CART.DELETE_PRODUCT_FROM_CART_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case CART.INCREASE_PRODUCT_QTY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.INCREASE_PRODUCT_QTY_SUCCESS:
      state = {
        ...state,
        loading: false,
        carts: action.payload.carts,
        totalPrice: action.payload.totalPrice,
      };
      break;
    case CART.INCREASE_PRODUCT_QTY_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case CART.DECREASE_PRODUCT_QTY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.DECREASE_PRODUCT_QTY_SUCCESS:
      state = {
        ...state,
        loading: false,
        carts: action.payload.carts,
        totalPrice: action.payload.totalPrice,
      };
      break;
    case CART.DECREASE_PRODUCT_QTY_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    default:
      return state;
  }
  return state;
}
