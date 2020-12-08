import * as ORDER from '../constants/orderConstant';

const initialState = {
  message: '',
  loading: false,
  orders: [],
  order: [],
  status: [],
  totalPrice: 0,
  couriers: [],
  totalOrders: 0,
  totalPage: 0,
  totalOrderThisMonth: 0,
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
        orders: action.payload.orders,
        totalPage: action.payload.totalPage,
        totalOrders: action.payload.totalOrders,
      };

      break;
    case ORDER.GET_ORDER__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_ORDER_THIS_MONTH_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_ORDER_THIS_MONTH_SUCCESS:
      state = {
        ...state,
        loading: false,
        totalOrderThisMonth: action.payload.totalOrder,
      };
      break;
    case ORDER.GET_ORDER_THIS_MONTH__FAIL:
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
    case ORDER.GET_TRANSACTION_STATUS_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_TRANSACTION_STATUS_SUCCESS:
      state = {
        ...state,
        loading: false,
        status: action.payload.transaction,
      };

      break;
    case ORDER.GET_TRANSACTION_STATUS__FAIL:
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
