import {io} from 'socket.io-client';
const socket = io('http://172.30.159.113:3000');
module.exports = socket;
