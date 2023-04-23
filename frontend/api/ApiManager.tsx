import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://workwize.azurewebsites.net/',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
