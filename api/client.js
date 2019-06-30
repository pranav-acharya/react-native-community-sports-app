import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: 'https://domain.com/foo/bar',
  /* other custom settings */
});

export default axiosInstance;