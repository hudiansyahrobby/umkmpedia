import Axios from '../Axios';
import * as USER from '../constants/userConstants';
import jwt from 'jsonwebtoken';

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
    localStorage.removeItem('user');
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
      console.log('LOGIN DATA', data);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: USER.SIGN_IN_SUCCESS, payload: { token: accessToken, user } });
    }
  } catch (error) {
    dispatch({ type: USER.SIGN_IN__FAIL, payload: { message: error.response.data.message } });
  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    jwt.verify(token, 'uE9kTv=xcbasuAG!U^bgLf8^g6rn*_LJ_vJZ2BYDPLH#K5jp$dSNt_HjRBd_FRjS');

    dispatch({ type: USER.SIGN_IN_SUCCESS, payload: { token, user } });
  } catch (error) {
    console.log('ERROR', error);
    dispatch({ type: USER.SIGN_IN__FAIL, payload: 'Token Tidak Valid' });
    return localStorage.clear();
  }
};

export const resetPassword = (email) => async (dispatch) => {
  dispatch({ type: USER.RESET_PASSWORD_INIT });
  try {
    const { data } = await Axios.post('/api/reset-password', email);
    dispatch({ type: USER.RESET_PASSWORD_SUCCESS, payload: { message: data.message } });
  } catch (error) {
    dispatch({ type: USER.SIGN_IN__FAIL, payload: { message: error.response.data.message } });
  }
};

export const postNewPassword = (password, resetToken, history) => async (dispatch) => {
  dispatch({ type: USER.POST_NEW_PASSWORD_INIT });
  console.log('PASSWORD', password);
  console.log('resetToken', resetToken);
  try {
    const { data } = await Axios.post(`/api/new-password/${resetToken}`, password);
    console.log('DATA', data);
    dispatch({ type: USER.RESET_PASSWORD_SUCCESS, payload: { message: data.message } });
    history.push('/masuk');
  } catch (error) {
    dispatch({ type: USER.SIGN_IN__FAIL, payload: { message: error.response.data.message } });
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

export const getCity = () => async (dispatch) => {
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
    dispatch({
      type: USER.UPDATE_PROFILE_SUCCESS,
      payload: { user: data.user },
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

export const getTotalUsers = () => async (dispatch) => {
  dispatch({ type: USER.GET_TOTAL_USERS_INIT });
  try {
    const { data } = await Axios.get('api/users');
    dispatch({
      type: USER.GET_TOTAL_USERS_SUCCESS,
      payload: { totalUsers: data.totalUsers },
    });
  } catch (error) {
    dispatch({
      type: USER.GET_TOTAL_USERS_FAIL,
      payload: { message: error },
    });
  }
};
