import axios from 'axios';

const ApiManager = axios.create({
  //baseURL: 'https://workwize.azurewebsites.net/',
  baseURL: 'http://10.0.140.194:3000/',
  responseType: 'json',
  withCredentials: true,
  validateStatus: (status) => true,
});

export default ApiManager;
