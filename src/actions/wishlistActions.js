import Axios from '../Axios';
import * as WISHLIST from '../constants/wishlistConstants';

export const addToWishlist = (id) => async (dispatch) => {
  dispatch({ type: WISHLIST.ADD_PRODUCT_TO_WISHLIST_INIT });
  try {
    const { data } = await Axios.post('api/wishlist', { id });
    console.log('wishlist data', data);
    dispatch({
      type: WISHLIST.ADD_PRODUCT_TO_WISHLIST_SUCCESS,
      payload: { wishlist: data.wishlist },
    });
  } catch (error) {
    dispatch({
      type: WISHLIST.ADD_PRODUCT_TO_WISHLIST_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getWishlist = () => async (dispatch) => {
  dispatch({ type: WISHLIST.GET_PRODUCTS_WISHLIST_INIT });
  try {
    const { data } = await Axios.get('api/wishlist');
    dispatch({
      type: WISHLIST.GET_PRODUCTS_WISHLIST_SUCCESS,
      payload: { wishlists: data.wishlist },
    });
  } catch (error) {
    dispatch({
      type: WISHLIST.GET_PRODUCTS_WISHLIST_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const deleteFromWishlist = (id) => async (dispatch) => {
  dispatch({ type: WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_INIT });
  try {
    await Axios.delete(`api/wishlist/${id}`);
    console.log('id', id);
    dispatch({ type: WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_SUCCESS, payload: { id: id } });
  } catch (error) {
    dispatch({
      type: WISHLIST.DELETE_PRODUCT_FROM_WISHLIST_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};
