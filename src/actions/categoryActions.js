import Axios from '../Axios';
import * as CATEGORY from '../constants/categoryConstants';

export const addCategories = (category) => async (dispatch) => {
  dispatch({ type: CATEGORY.ADD_CATEGORY_INIT });
  try {
    const { data } = await Axios.post('api/category', category, {
      headers: {
        'Content-Type': 'multipart/data',
      },
    });
    dispatch({ type: CATEGORY.ADD_CATEGORY_SUCCESS, payload: { category: data.category } });
  } catch (error) {
    dispatch({
      type: CATEGORY.ADD_CATEGORY__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getcategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY.GET_CATEGORIES_INIT });
  try {
    const { data } = await Axios.get('api/category');
    if (data.categories) {
      dispatch({
        type: CATEGORY.GET_CATEGORIES_SUCCESS,
        payload: { categories: data.categories },
      });
    } else {
      dispatch({
        type: CATEGORY.GET_CATEGORIES_SUCCESS,
        payload: { categories: [] },
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY.GET_CATEGORIES__FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const updateCategoryById = (id, categories) => async (dispatch) => {
  dispatch({ type: CATEGORY.UPDATE_CATEGORY_INIT });
  try {
    await Axios.put(`api/category/${id}`, categories, {
      headers: {
        'Content-Type': 'multipart/data',
      },
    });
    dispatch({ type: CATEGORY.UPDATE_CATEGORY_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: CATEGORY.UPDATE_CATEGORY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const deleteCategoryById = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY.DELETE_CATEGORY_INIT });
  try {
    await Axios.delete(`api/category/${id}`);
    dispatch({ type: CATEGORY.DELETE_CATEGORY_SUCCESS, payload: { id } });
  } catch (error) {
    dispatch({
      type: CATEGORY.DELETE_CATEGORY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const resetCategory = () => async (dispatch) => {
  dispatch({ type: CATEGORY.RESET_STATUS_CATEGORY });
};

export const resetStateCategory = () => async (dispatch) => {
  dispatch({ type: CATEGORY.RESET_STATE_CATEGORY });
};
