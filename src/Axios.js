import axios from 'axios';

const fetchClient = () => {
  // Create instance
  let instance = axios.create({
    baseURL: 'http://localhost:5000/',
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();
