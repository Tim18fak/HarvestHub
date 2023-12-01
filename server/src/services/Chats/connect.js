const { Server } = require('socket.io');
const { ChatModule } = require('../../../Model/DB_structure');

const Connect = (server) => {

    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:5173', // Allow requests from your React app's domain
          methods: ['GET', 'POST'],
        },
      });

      io.on('connection', (socket) => {
        console.log('A user connected' + socket.id);
        socket.on('disconnect',() => {
          console.log('A user disconnected' + socket.id);
        })
        socket.on('chat',(data) => {
          console.log(data)
        })
        socket.broadcast.emit('msg','yyy')
        socket.on('support', () => {

        }, ()=> {

        })
      });

}

module.exports = Connect;