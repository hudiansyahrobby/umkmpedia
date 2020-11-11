import * as ORDER from '../constants/orderConstant';

const initialState = {
  message: '',
  loading: false,
  orders: [],
  totalPrice: 0,
  provinces: [],
  cities: [],
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
    case ORDER.GET_PROVINCE_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_PROVINCE_SUCCESS:
      state = {
        ...state,
        loading: false,
        provinces: state.provinces.concat(action.payload.provinces),
      };

      break;
    case ORDER.GET_PROVINCE_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ORDER.GET_CITY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ORDER.GET_CITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        cities: state.cities.concat(action.payload.cities),
      };

      break;
    case ORDER.GET_CITY_FAIL:
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
