import axios from 'axios';

const fetchClient = () => {
  // Create instance
  let instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      console.log(token);
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    },
    (error) => {
      console.log('ERR ATAS', error);
      Promise.reject(error);
    },
  );

  //response interceptor to refresh token on receiving token expired error
  instance.interceptors.response.use(
    (response) => {
      console.log('RES', response);
      return response;
    },
    function (error) {
      console.log('ERR', error);
      const originalRequest = error.config;
      // let refreshToken = localStorage.getItem('refreshToken');
      console.log(error.response.status);
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return instance.post('api/refresh_token').then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.accessToken);
            console.log('Access token refreshed!');
            return instance(originalRequest);
          }
        });
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default fetchClient();
