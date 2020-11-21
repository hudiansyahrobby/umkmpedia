import Axios from '../Axios';
import * as ORDER from '../constants/orderConstant';

export const addToOrder = (productItem, totalPrice, history) => async (dispatch) => {
  const orderData = {
    products: productItem,
    totalPrice,
  };
  dispatch({ type: ORDER.ADD_ORDER_INIT });
  try {
    const { data } = await Axios.post('api/order', orderData);
    dispatch({
      type: ORDER.ADD_ORDER_SUCCESS,
      payload: {
        order: data.order,
      },
    });
    history.push(`/order/${data.order._id}`);
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

export const getOrderById = (id) => async (dispatch) => {
  dispatch({ type: ORDER.GET_ORDER_BY_ID_INIT });
  try {
    const { data } = await Axios.get(`api/order/${id}`);
    dispatch({
      type: ORDER.GET_ORDER_BY_ID_SUCCESS,
      payload: { order: data.order },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_ORDER_BY_ID_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getCost = (orderData) => async (dispatch) => {
  dispatch({ type: ORDER.GET_COURIER_INIT });
  try {
    const { data } = await Axios.post(`api/courier`, orderData);
    dispatch({
      type: ORDER.GET_COURIER_SUCCESS,
      payload: { courier: data.courier },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_COURIER_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.RESET_ORDER });
};
