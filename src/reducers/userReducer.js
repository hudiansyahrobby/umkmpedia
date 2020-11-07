import * as USER from '../constants/userConstants';

const initialState = {
  authenticated: false,
  user: null,
  token: '',
  message: '',
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
        token: action.payload,
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
    default:
      return state;
  }
  return state;
}
