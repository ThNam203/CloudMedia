import {io} from 'socket.io-client';
import { nameStorage, retrieveData } from '../reducers/AsyncStorage';
import jwt_decode from 'jwt-decode'

const baseURL = process.env.NODE_ENV ? 'http://10.0.140.194:3000/' : 'https://workwize.azurewebsites.net/'
(async () => {
  const userJWT = await retrieveData(nameStorage.jwtToken);
  const data = jwt_decode(userJWT)
  const userId = data.id
  const socket = io(baseURL, {
    auth: {
      userId,
    }
  });
  module.exports = socket;
})();
