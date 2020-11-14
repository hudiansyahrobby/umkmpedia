import Axios from '../Axios';
import * as ORDER from '../constants/orderConstant';

export const addToOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.ADD_ORDER_INIT });
  try {
    await Axios.post('api/order');
    dispatch({
      type: ORDER.ADD_ORDER_SUCCESS,
      payload: { message: 'Produk Berhasil Diorder' },
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

export const getCost = (orderData) => async (dispatch) => {
  console.log(orderData);
  dispatch({ type: ORDER.GET_COURIER_INIT });
  try {
    const { data } = await Axios.post(`api/courier`, orderData);
    console.log(data);
    dispatch({
      type: ORDER.GET_COURIER_SUCCESS,
      payload: { courier: data.courier },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER.GET_COURIER_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.RESET_ORDER });
};
