import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

axiosInstance.getWithHeaders = url => axios.get(url,
  { headers: { Authorization: global.email } });

export default axiosInstance;
