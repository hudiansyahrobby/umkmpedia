import Axios from '../Axios';
import * as CART from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch) => {
  dispatch({ type: CART.ADD_PRODUCT_TO_CART_INIT });
  try {
    const { data } = await Axios.post('api/cart', { id });
    if (data) {
      const { cart } = data;
      dispatch({
        type: CART.ADD_PRODUCT_TO_CART_SUCCESS,
        payload: { cart },
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
      const { products } = data.cart;
      dispatch({
        type: CART.GET_PRODUCTS_CART_SUCCESS,
        payload: { carts: products },
      });
    } else {
      dispatch({
        type: CART.GET_PRODUCTS_CART_SUCCESS,
        payload: { carts: [] },
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

export const onChangeQuantity = (id, quantity) => async (dispatch) => {
  const cartData = {
    id,
    quantity,
  };
  console.log('CART DATA', cartData);
  dispatch({ type: CART.CHANGE_PRODUCT_QTY_INIT });
  try {
    const { data } = await Axios.post('api/cart/change-quantity', cartData);
    if (data.cart) {
      const { products } = data.cart;
      dispatch({
        type: CART.CHANGE_PRODUCT_QTY_SUCCESS,
        payload: { carts: products },
      });
    }
  } catch (error) {
    dispatch({
      type: CART.CHANGE_PRODUCT_QTY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};
