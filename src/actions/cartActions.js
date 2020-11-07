import Axios from '../Axios';
import * as CART from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch) => {
  dispatch({ type: CART.ADD_PRODUCT_TO_CART_INIT });
  try {
    const { data } = await Axios.post('api/cart', { id });
    if (data) {
      const { cart, totalPrice } = data;
      dispatch({
        type: CART.ADD_PRODUCT_TO_CART_SUCCESS,
        payload: { cart, totalPrice },
      });
    }
  } catch (error) {
    dispatch({
      type: CART.ADD_PRODUCT_TO_CART_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getCart = () => async (dispatch) => {
  dispatch({ type: CART.GET_PRODUCTS_CART_INIT });
  try {
    const { data } = await Axios.get('api/cart');
    if (data.cart) {
      const { products, totalPrice } = data.cart;
      dispatch({
        type: CART.GET_PRODUCTS_CART_SUCCESS,
        payload: { carts: products, totalPrice: totalPrice },
      });
    } else {
      dispatch({
        type: CART.GET_PRODUCTS_CART_SUCCESS,
        payload: { carts: [], totalPrice: 0 },
      });
    }
  } catch (error) {
    dispatch({
      type: CART.GET_PRODUCTS_CART_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const deleteFromCart = (id) => async (dispatch) => {
  dispatch({ type: CART.DELETE_PRODUCT_FROM_CART_INIT });
  try {
    await Axios.delete(`api/cart/${id}`);
    dispatch({ type: CART.DELETE_PRODUCT_FROM_CART_SUCCESS, payload: { productId: id } });
  } catch (error) {
    dispatch({
      type: CART.DELETE_PRODUCT_FROM_CART_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const increaseProductQty = (cartData) => async (dispatch) => {
  dispatch({ type: CART.INCREASE_PRODUCT_QTY_INIT });
  try {
    const { data } = await Axios.post('api/cart/increase-quantity', cartData);
    if (data.cart) {
      const { products, totalPrice } = data.cart;
      dispatch({
        type: CART.INCREASE_PRODUCT_QTY_SUCCESS,
        payload: { carts: products, totalPrice: totalPrice },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: CART.INCREASE_PRODUCT_QTY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const decreaseProductQty = (cartData) => async (dispatch) => {
  dispatch({ type: CART.DECREASE_PRODUCT_QTY_INIT });

  try {
    const { data } = await Axios.post('api/cart/decrease-quantity', cartData);
    if (data.cart) {
      const { products, totalPrice } = data.cart;

      dispatch({
        type: CART.DECREASE_PRODUCT_QTY_SUCCESS,
        payload: { carts: products, totalPrice: totalPrice },
      });
    }
  } catch (error) {
    dispatch({
      type: CART.DECREASE_PRODUCT_QTY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};
