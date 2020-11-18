import * as CART from '../constants/cartConstants';

const initialState = {
  message: '',
  loading: false,
  carts: [],
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
      };
      break;
    case CART.ADD_PRODUCT_TO_CART_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case CART.CHANGE_PRODUCT_QTY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CART.CHANGE_PRODUCT_QTY_SUCCESS:
      state = {
        ...state,
        loading: false,
        carts: action.payload.carts,
      };
      break;
    case CART.CHANGE_PRODUCT_QTY_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
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
      state = {
        ...state,
        loading: false,
        carts: state.carts.filter((cart) => cart._id !== action.payload.productId),
      };
      break;
    case CART.DELETE_PRODUCT_FROM_CART_FAIL:
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
