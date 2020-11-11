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

export const getProvince = () => async (dispatch) => {
  dispatch({ type: ORDER.GET_PROVINCE_INIT });
  try {
    const { data } = await Axios.get('api/province');
    console.log(data);
    dispatch({
      type: ORDER.GET_PROVINCE_SUCCESS,
      payload: { provinces: data.provinces },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_PROVINCE_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getCity = (id) => async (dispatch) => {
  console.log('ID', id);
  dispatch({ type: ORDER.GET_CITY_INIT });
  try {
    const { data } = await Axios.get(`api/city/${id}`);
    dispatch({
      type: ORDER.GET_CITY_SUCCESS,
      payload: { cities: data.cities },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_CITY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getCost = (orderData) => async (dispatch) => {
  dispatch({ type: ORDER.GET_COST_INIT });
  try {
    const { data } = await Axios.get(`api/cost`, orderData);
    dispatch({
      type: ORDER.GET_COST_SUCCESS,
      payload: { cost: data.cost },
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_COST_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};
