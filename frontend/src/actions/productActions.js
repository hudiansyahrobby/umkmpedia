import Axios from '../Axios';
import * as PRODUCT from '../constants/productConstants';

export const addNewProduct = (products, history) => async (dispatch) => {
  dispatch({ type: PRODUCT.ADD_PRODUCT_INIT });
  try {
    const { data } = await Axios.post('api/products', products, {
      headers: {
        'Content-Type': 'multipart/data',
      },
    });
    dispatch({ type: PRODUCT.ADD_PRODUCT_SUCCESS, payload: { product: data.product } });
    history.push('/produk');
  } catch (error) {
    dispatch({
      type: PRODUCT.ADD_PRODUCT__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getProducts = (search = '', page = 1, category = '') => async (dispatch) => {
  dispatch({ type: PRODUCT.GET_PRODUCTS_INIT });
  try {
    const { data } = await Axios.get(
      `api/products?search=${search}&page=${page}&category=${category}`,
    );
    dispatch({
      type: PRODUCT.GET_PRODUCTS_SUCCESS,
      payload: {
        products: data.products,
        totalPage: data.totalPage,
        totalProducts: data.totalProducts,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT.GET_PRODUCTS__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const updateProductById = (id, products, history) => async (dispatch) => {
  dispatch({ type: PRODUCT.UPDATE_PRODUCT_INIT });
  try {
    await Axios.put(`api/products/${id}`, products, {
      headers: {
        'Content-Type': 'multipart/data',
      },
    });
    dispatch({ type: PRODUCT.UPDATE_PRODUCT_SUCCESS, payload: { id } });
    history.push('/produk');
  } catch (error) {
    dispatch({
      type: PRODUCT.UPDATE_PRODUCT_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT.GET_PRODUCT_BY_ID_INIT });
  try {
    const { data } = await Axios.get(`api/products/${id}`);
    if (data?.product) {
      dispatch({ type: PRODUCT.GET_PRODUCT_BY_ID_SUCCESS, payload: { product: data.product } });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT.GET_PRODUCT_BY_ID_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getProductsByBrand = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT.GET_PRODUCTS_INIT });
  try {
    const { data } = await Axios.get(`api/products/${id}`);
    dispatch({
      type: PRODUCT.GET_PRODUCTS_SUCCESS,
      payload: { products: data.products, totalPage: data.totalPage },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT.GET_PRODUCTS__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT.DELETE_PRODUCT_INIT });
  try {
    await Axios.delete(`api/products/${id}`);
    dispatch({ type: PRODUCT.DELETE_PRODUCT_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: PRODUCT.DELETE_PRODUCT_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const resetProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT.RESET_STATUS_PRODUCT });
};

export const resetStateProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT.RESET_STATE_PRODUCT });
};
