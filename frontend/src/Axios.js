import axios from "axios";

const fetchClient = () => {
  // Create instance
  let instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  //response interceptor to refresh token on receiving token expired error
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      // let refreshToken = localStorage.getItem('refreshToken');
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return instance.post("api/refresh_token").then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accessToken);
            return instance(originalRequest);
          }
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default fetchClient();
