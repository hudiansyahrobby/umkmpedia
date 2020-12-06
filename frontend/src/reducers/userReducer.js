import * as USER from '../constants/userConstants';

const initialState = {
  authenticated: false,
  user: null,
  token: '',
  message: '',
  totalUsers: 0,
  success: false,
  error: false,
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
        success: true,
        error: false,
      };
      break;
    case USER.SIGN_UP__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
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
        success: true,
        error: false,
      };
      break;
    case USER.SIGN_IN__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
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
    case USER.RESET_PASSWORD_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case USER.RESET_PASSWORD__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload,
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
    case USER.GET_TOTAL_USERS_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case USER.GET_TOTAL_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        totalUsers: action.payload.totalUsers,
      };
      break;
    case USER.GET_TOTAL_USERS_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case USER.RESET_STATE:
      state = initialState;
      break;
    default:
      return state;
  }
  return state;
}
