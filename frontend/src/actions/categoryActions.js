import Axios from "../Axios";
import * as CATEGORY from "../constants/categoryConstants";

export const addCategories = (category) => async (dispatch) => {
  dispatch({ type: CATEGORY.ADD_CATEGORY_INIT });
  try {
    const { data } = await Axios.post("api/category", category);
    dispatch({
      type: CATEGORY.ADD_CATEGORY_SUCCESS,
      payload: { category: data.category },
    });
  } catch (error) {
    dispatch({
      type: CATEGORY.ADD_CATEGORY__FAIL,
      payload: { message: error.response.data?.message },
    });
  }
};

export const getcategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY.GET_CATEGORIES_INIT });
  try {
    const { data } = await Axios.get("api/category");
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
      payload: { message: error.response.data?.message },
    });
  }
};

export const getCategoryById = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY.GET_CATEGORY_INIT });
  try {
    const { data } = await Axios.get(`api/category/${id}`);
    if (data.category) {
      dispatch({
        type: CATEGORY.GET_CATEGORY_SUCCESS,
        payload: { category: data.category },
      });
    } else {
      dispatch({
        type: CATEGORY.GET_CATEGORY_SUCCESS,
        payload: { category: [] },
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY.GET_CATEGORY__FAIL,
      payload: { message: error.response.data?.message },
    });
  }
};

export const updateCategoryById =
  (id, category, history) => async (dispatch) => {
    dispatch({ type: CATEGORY.UPDATE_CATEGORY_INIT });
    try {
      const { data } = await Axios.put(`api/category/${id}`, category);
      if (data.message) {
        dispatch({
          type: CATEGORY.UPDATE_CATEGORY_SUCCESS,
          payload: { message: data.message },
        });
        history.push("/admin/tambah-kategori");
      }
    } catch (error) {
      dispatch({
        type: CATEGORY.UPDATE_CATEGORY_FAIL,
        payload: { message: error.response.data?.message },
      });
    }
  };

export const deleteCategoryById = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY.DELETE_CATEGORY_INIT });
  try {
    const { data } = await Axios.delete(`api/category/${id}`);
    dispatch({
      type: CATEGORY.DELETE_CATEGORY_SUCCESS,
      payload: { id, message: data.message },
    });
  } catch (error) {
    dispatch({
      type: CATEGORY.DELETE_CATEGORY_FAIL,
      payload: { message: error.response.data?.message },
    });
  }
};

export const resetCategory = () => async (dispatch) => {
  dispatch({ type: CATEGORY.RESET_STATUS_CATEGORY });
};
