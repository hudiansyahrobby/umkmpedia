import Axios from '../Axios';
import * as ORDER from '../constants/orderConstant';

export const addToOrder = (orderData) => async (dispatch) => {
  dispatch({ type: ORDER.ADD_ORDER_INIT });
  try {
    const { data } = await Axios.post('api/order', orderData);
    dispatch({
      type: ORDER.ADD_ORDER_SUCCESS,
      payload: {
        order: data.order,
      },
    });
  } catch (error) {
    dispatch({ type: ORDER.ADD_ORDER__FAIL, payload: { message: error.response.data.message } });
  }
};

export const getOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.GET_ORDER_INIT });
  try {
    const { data } = await Axios.get('api/order/admin');
    dispatch({
      type: ORDER.GET_ORDER_SUCCESS,
      payload: { orders: data.order, totalPage: data.totalPage, totalOrders: data.totalOrders },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_ORDER__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getOrderByUser = (page = 1) => async (dispatch) => {
  dispatch({ type: ORDER.GET_ORDER_INIT });
  try {
    const { data } = await Axios.get(`api/order/user?page=${page}`);
    dispatch({
      type: ORDER.GET_ORDER_SUCCESS,
      payload: { orders: data.order, totalPage: data.totalPage },
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

export const getPayment = (paymentData) => async (dispatch) => {
  dispatch({ type: ORDER.GET_PAYMENT_INIT });
  try {
    const { data } = await Axios.post(`api/payment`, paymentData);
    dispatch({
      type: ORDER.GET_PAYMENT_SUCCESS,
      payload: { payment: data.result },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_PAYMENT__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getTransactionStatus = (id) => async (dispatch) => {
  dispatch({ type: ORDER.GET_TRANSACTION_STATUS_INIT });
  try {
    const { data } = await Axios.get(`api/payment/${id}`);
    dispatch({
      type: ORDER.GET_TRANSACTION_STATUS_SUCCESS,
      payload: { transaction: data.transaction },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_TRANSACTION_STATUS__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const addResi = (id, resiData, history) => async (dispatch) => {
  dispatch({ type: ORDER.ADD_RESI_INIT });
  try {
    await Axios.put(`api/order/${id}`, resiData);
    dispatch({
      type: ORDER.ADD_RESI_SUCCESS,
    });
    history.push('/admin');
  } catch (error) {
    dispatch({ type: ORDER.ADD_RESI__FAIL, payload: { message: error.response.data.message } });
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch({ type: ORDER.RESET_ORDER });
};
