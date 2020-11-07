import axios from 'axios';

//An instance that holds the base URL is created to be used within any component that makes requests to the base URL
const token = localStorage.getItem('token');

const Axios = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default Axios;
