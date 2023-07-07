import axios from 'axios';

// const baseURL =
//   process.env.NODE_ENV !== 'development'
//     ? 'https://workwize.azurewebsites.net'
//     : 'http://10.0.140.194:3000';

const baseURL = 'https://workwize.azurewebsites.net';

const ApiManager = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  withCredentials: true,
  validateStatus: status => true,
});

export default ApiManager;
