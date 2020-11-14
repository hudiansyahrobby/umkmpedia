import Axios from '../Axios';
import * as USER from '../constants/userConstants';

export const signup = (user, history) => async (dispatch) => {
  dispatch({ type: USER.SIGN_UP_INIT });
  try {
    const { data } = await Axios.post('/api/signup', user);
    dispatch({ type: USER.SIGN_UP_SUCCESS, payload: { token: data.accessToken } });
    history.push('/masuk');
  } catch (error) {
    dispatch({ type: USER.SIGN_UP__FAIL, payload: { message: error.response.data.message } });
  }
};

export const signout = (history) => async (dispatch) => {
  dispatch({ type: USER.SIGN_OUT_INIT });
  try {
    await Axios.post('/api/signout');
    dispatch({ type: USER.SIGN_OUT_SUCCESS });
    localStorage.removeItem('token');
    history.push('/masuk');
  } catch (error) {
    dispatch({ type: USER.SIGN_OUT__FAIL, payload: { message: 'Gagal Logout' } });
  }
};

export const signin = (userData) => async (dispatch) => {
  dispatch({ type: USER.SIGN_IN_INIT });
  try {
    const { data } = await Axios.post('/api/signin', userData);
    if (data) {
      const { accessToken, user } = data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      dispatch({ type: USER.SIGN_IN_SUCCESS, payload: { token: accessToken, user } });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: USER.SIGN_IN__FAIL, payload: { message: error.response.data.message } });
  }
};

export const isUserLoggedIn = (history) => async (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (token && user) {
    dispatch({ type: USER.SIGN_IN_SUCCESS, payload: { token, user } });
  } else {
    localStorage.removeItem('token');
    dispatch({ type: USER.SIGN_IN__FAIL, payload: 'Token Tidak Valid' });
  }
};

export const getProvince = () => async (dispatch) => {
  dispatch({ type: USER.GET_PROVINCE_INIT });
  try {
    const { data } = await Axios.get('api/province');
    console.log(data);
    dispatch({
      type: USER.GET_PROVINCE_SUCCESS,
      payload: { provinces: data.provinces },
    });
  } catch (error) {
    dispatch({
      type: USER.GET_PROVINCE_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const getCity = (provinceId) => async (dispatch) => {
  dispatch({ type: USER.GET_CITY_INIT });
  try {
    const { data } = await Axios.get(`api/city`);
    dispatch({
      type: USER.GET_CITY_SUCCESS,
      payload: { cities: data.cities },
    });
  } catch (error) {
    dispatch({
      type: USER.GET_CITY_FAIL,
      payload: { message: error.response.data.message },
    });
  }
};

export const updateProfile = (updatedProfile, history) => async (dispatch) => {
  dispatch({ type: USER.UPDATE_PROFILE_INIT });
  try {
    const { data } = await Axios.put('api/update-profile', updatedProfile);
    console.log(data);
    dispatch({
      type: USER.UPDATE_PROFILE_SUCCESS,
      // payload: { user: data.user },
    });
    localStorage.setItem('user', JSON.stringify(data.user));
    history.push('/profil');
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER.UPDATE_PROFILE_FAIL,
      payload: { message: error },
    });
  }
};
