import * as USER from '../constants/userConstants';

const initialState = {
  authenticated: false,
  user: null,
  token: '',
  message: '',
  provinces: [],
  cities: [],
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.SIGN_UP_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.SIGN_UP_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case USER.SIGN_UP__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case USER.SIGN_IN_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.SIGN_IN_SUCCESS:
      state = {
        ...state,
        loading: false,
        token: action.payload.token,
        authenticated: true,
        user: action.payload.user,
      };
      break;
    case USER.SIGN_IN__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case USER.SIGN_OUT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.SIGN_OUT_SUCCESS:
      state = {
        ...state,
        loading: false,
        token: '',
        authenticated: false,
        user: null,
      };
      break;
    case USER.SIGN_OUT__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload,
      };
      break;
    case USER.GET_PROVINCE_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.GET_PROVINCE_SUCCESS:
      state = {
        ...state,
        loading: false,
        provinces: action.payload.provinces,
      };

      break;
    case USER.GET_PROVINCE_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case USER.GET_CITY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.GET_CITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        cities: action.payload.cities,
      };

      break;
    case USER.GET_CITY_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case USER.UPDATE_PROFILE_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.UPDATE_PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
      };
      break;
    case USER.UPDATE_PROFILE_FAIL:
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
