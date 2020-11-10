import * as WISHLIST from '../constants/wishlistConstants';

const initialState = {
  message: '',
  loading: false,
  wishlists: [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST.ADD_PRODUCT_TO_WISHLIST_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case WISHLIST.ADD_PRODUCT_TO_WISHLIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        wishlists: state.wishlists.concat(action.payload.wishlist),
      };
      break;
    case WISHLIST.ADD_PRODUCT_TO_WISHLIST_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case WISHLIST.GET_PRODUCTS_WISHLIST_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case WISHLIST.GET_PRODUCTS_WISHLIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        wishlists: action.payload.wishlists,
      };
      break;
    case WISHLIST.GET_PRODUCTS_WISHLIST_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        wishlists: state.wishlists.filter((wishlist) => wishlist.productId !== action.payload.id),
      };
      break;
    case WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_FAIL:
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
