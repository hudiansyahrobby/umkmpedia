import Axios from '../Axios';
import * as UNIT from '../constants/unitConstants';

export const addUnit = (unit) => async (dispatch) => {
  dispatch({ type: UNIT.ADD_UNIT_INIT });
  try {
    const { data } = await Axios.post('api/unit', unit);
    dispatch({ type: UNIT.ADD_UNIT_SUCCESS, payload: { unit: data.unit } });
  } catch (error) {
    dispatch({
      type: UNIT.ADD_UNIT_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getUnits = () => async (dispatch) => {
  dispatch({ type: UNIT.GET_UNIT_INIT });
  try {
    const { data } = await Axios.get('api/unit');
    if (data.units) {
      dispatch({
        type: UNIT.GET_UNIT_SUCCESS,
        payload: { units: data.units },
      });
    } else {
      dispatch({
        type: UNIT.GET_UNIT_SUCCESS,
        payload: { units: [] },
      });
    }
  } catch (error) {
    dispatch({
      type: UNIT.GET_UNIT_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const resetUnit = () => async (dispatch) => {
  dispatch({ type: UNIT.RESET_STATE_UNIT });
};
