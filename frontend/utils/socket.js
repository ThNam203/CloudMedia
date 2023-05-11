import {io} from 'socket.io-client';
const socket = io('http://10.0.140.194:3000');
module.exports = socket;
