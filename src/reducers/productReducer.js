import * as PRODUCT from '../constants/productConstants';

const initialState = {
  message: '',
  success: false,
  error: false,
  products: [],
  product: [],
  loading: false,
  totalPage: 1,
  totalProducts: 0,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT.ADD_PRODUCT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: state.products.concat(action.payload.product),
        success: true,
        error: false,
      };
      break;
    case PRODUCT.ADD_PRODUCT__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
      };
      break;
    case PRODUCT.UPDATE_PRODUCT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
      break;
    case PRODUCT.UPDATE_PRODUCT_FAIL:
      state = {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
      break;
    case PRODUCT.GET_PRODUCTS_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT.GET_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload.products,
        totalPage: action.payload.totalPage,
        totalProducts: action.payload.totalProducts,
      };
      break;
    case PRODUCT.GET_PRODUCTS__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        error: true,
      };
      break;
    case PRODUCT.GET_PRODUCT_BY_ID_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        product: [action.payload.product],
      };
      break;
    case PRODUCT.GET_PRODUCT_BY_ID_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        error: true,
      };
      break;
    case PRODUCT.DELETE_PRODUCT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PRODUCT.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        products: state.products.filter(({ _id }) => _id !== action.payload.id),
        success: true,
        error: false,
      };
      break;
    case PRODUCT.DELETE_PRODUCT_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
      };
      break;

    case PRODUCT.RESET_STATUS_PRODUCT:
      state = {
        ...state,
        message: '',
        success: false,
        error: false,
      };
      break;
    case PRODUCT.RESET_STATE_PRODUCT:
      state = {
        ...state,
        message: '',
        success: false,
        error: false,
        products: [],
        product: null,
        loading: false,
        totalPage: 1,
      };
      break;
    default:
      return state;
  }
  return state;
}
