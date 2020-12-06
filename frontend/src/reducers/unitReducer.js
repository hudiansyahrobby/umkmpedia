import * as UNIT from '../constants/unitConstants';

const initialState = {
  message: '',
  success: false,
  error: false,
  units: [],
  loading: false,
};

export default function unitReducer(state = initialState, action) {
  switch (action.type) {
    case UNIT.ADD_UNIT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case UNIT.ADD_UNIT_SUCCESS:
      state = {
        ...state,
        loading: false,
        units: state.units.concat(action.payload.unit),
        success: true,
        error: false,
      };
      break;
    case UNIT.ADD_UNIT_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: true,
      };
      break;
    case UNIT.GET_UNIT_INIT:
      state = {
        ...state,
        loading: true,
      };
      break;
    case UNIT.GET_UNIT_SUCCESS:
      state = {
        ...state,
        loading: false,
        units: action.payload.units,
      };
      break;
    case UNIT.GET_UNIT_FAIL:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        error: true,
      };
      break;
    case UNIT.RESET_STATE_UNIT:
      state = initialState;
      break;
    default:
      return state;
  }
  return state;
}
