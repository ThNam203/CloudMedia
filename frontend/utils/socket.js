import {io} from 'socket.io-client';
import { nameStorage, retrieveData } from '../reducers/AsyncStorage';
import jwt_decode from 'jwt-decode'

(async () => {
  const userJWT = await retrieveData(nameStorage.jwtToken);
  const data = jwt_decode(userJWT)
  const userId = data.id
  const socket = io('https://workwize.azurewebsites.net', {
    auth: {
      userId,
    }
  });
  module.exports = socket;
})();
