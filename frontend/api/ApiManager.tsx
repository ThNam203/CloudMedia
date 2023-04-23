import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://workwise.onrender.com',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
