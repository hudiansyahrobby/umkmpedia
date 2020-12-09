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
    jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET);

    dispatch({ type: USER.SIGN_IN_SUCCESS, payload: { token, user } });
  } catch (error) {
    dispatch({ type: USER.SIGN_IN__FAIL, payload: 'Token Tidak Valid' });
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
  try {
    const { data } = await Axios.post(`/api/new-password/${resetToken}`, password);
    dispatch({ type: USER.RESET_PASSWORD_SUCCESS, payload: { message: data.message } });
    history.push('/masuk');
  } catch (error) {
    dispatch({ type: USER.SIGN_IN__FAIL, payload: { message: error.response.data.message } });
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

export const resetState = () => async (dispatch) => {
  dispatch({ type: USER.RESET_STATE });
};
