import * as CATEGORY from '../constants/categoryConstants';

const initialState = {
  message: '',
  success: false,
  error: false,
  categories: [],
  loading: false,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY.ADD_CATEGORY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CATEGORY.ADD_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: state.categories.concat(action.payload.category),
        success: true,
        error: false,
      };
      break;
    case CATEGORY.ADD_CATEGORY__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
      };
      break;
    case CATEGORY.UPDATE_CATEGORY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CATEGORY.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
      break;
    case CATEGORY.UPDATE_CATEGORY_FAIL:
      state = {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
      break;
    case CATEGORY.GET_CATEGORIES_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CATEGORY.GET_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
        totalPage: action.payload.totalPage,
      };
      break;
    case CATEGORY.GET_CATEGORIES__FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        error: true,
      };
      break;
    case CATEGORY.DELETE_CATEGORY_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case CATEGORY.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: state.categories.filter(({ _id }) => _id !== action.payload.id),
        success: true,
        error: false,
      };
      break;
    case CATEGORY.DELETE_CATEGORY_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
      };
      break;

    case CATEGORY.RESET_STATUS_CATEGORY:
      state = {
        ...state,
        message: '',
        success: false,
        error: false,
      };
      break;
    case CATEGORY.RESET_STATE_CATEGORY:
      state = {
        ...state,
        message: '',
        success: false,
        error: false,
        categories: [],
        loading: false,
      };
      break;
    default:
      return state;
  }
  return state;
}
