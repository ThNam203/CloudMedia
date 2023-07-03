import { io } from 'socket.io-client';

const baseURL = 'http://10.0.140.194:3000';
let socket = null;

const connectSocket = (userId) => {
  socket = io(baseURL, {
    auth: {
      userId,
    }
  });

  socket.on('connect', () => {
    console.log('Socket connected to ' + baseURL);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected');
  }
};

const subscribeToEvent = (eventName, callback) => {
  if (socket)
    socket.on(eventName, callback);
};

const emitEvent = (eventName, data) => {
  if (socket)
    socket.emit(eventName, data);
};

export { connectSocket, disconnectSocket, subscribeToEvent, emitEvent };
export default { connectSocket, disconnectSocket, subscribeToEvent, emitEvent };