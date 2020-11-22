import * as ORDER from '../constants/orderConstant';

const initialState = {
  message: '',
  loading: false,
  orders: [],
  order: [],
  totalPrice: 0,
  couriers: [],
  token: null,
  redirect_url: '',
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER.ADD_ORDER_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.ADD_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: state.orders.concat(action.payload.order),
      };
      break;
    case ORDER.ADD_ORDER__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_ORDER_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: state.orders.concat(action.payload.orders),
      };

      break;
    case ORDER.GET_ORDER__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_PAYMENT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        token: action.payload.payment.token,
        redirect_url: action.payload.payment.redirect_url,
      };

      break;
    case ORDER.GET_PAYMENT__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_ORDER_BY_ID_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_ORDER_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        order: action.payload.order,
      };

      break;
    case ORDER.GET_ORDER_BY_ID_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_COURIER_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_COURIER_SUCCESS:
      state = {
        ...state,
        loading: false,
        couriers: state.couriers.concat(action.payload.courier),
      };
      break;
    case ORDER.GET_COURIER_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.RESET_ORDER:
      state = initialState;
      break;
    default:
      return state;
  }
  return state;
}
