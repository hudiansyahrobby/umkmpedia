import * as ORDER from '../constants/orderConstant';

const initialState = {
  message: '',
  loading: false,
  orders: [],
  totalPrice: 0,
  couriers: [],
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
        message: action.payload.message,
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
