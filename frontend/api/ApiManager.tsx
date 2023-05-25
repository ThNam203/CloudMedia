import axios from 'axios';

const baseURL = process.env.NODE_ENV ? 'http://10.0.140.194:3000/' : 'https://workwize.azurewebsites.net/'
const ApiManager = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  withCredentials: true,
  validateStatus: (status) => true,
});

export default ApiManager;
