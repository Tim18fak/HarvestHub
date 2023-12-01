/* import {io} from 'socket.io-client'

export const Connect = () => {
    const socket = io('http://localhost');
    socket.on('connect', () => {
        console.log('Connected to the server');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
      });
      socket.emit('chat', 'hello')
}
export const ActiveUser = () => {
  const socket = io('http://localhost');
  socket.on('connect', () => {
      console.log('Connected to the server');
    });
    socket.on('active',(data) => {
      
    })
} */