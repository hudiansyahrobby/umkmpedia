import Axios from '../Axios';
import * as ORDER from '../constants/orderConstant';

export const addToOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.ADD_ORDER_INIT });
  try {
    await Axios.post('api/order');
    dispatch({
      type: ORDER.ADD_ORDER_SUCCESS,
      payload: { message: 'Products Ordered Successfully' },
    });
    alert('Thank you for Ordering');
  } catch (error) {
    dispatch({ type: ORDER.ADD_ORDER__FAIL, payload: { message: error.response.data.message } });
  }
};

export const getOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.GET_ORDER_INIT });
  try {
    const { data } = await Axios.get('api/order');
    dispatch({
      type: ORDER.GET_ORDER_SUCCESS,
      payload: { orders: data.order },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_ORDER__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};
