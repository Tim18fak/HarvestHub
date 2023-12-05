const { Server } = require('socket.io');
const { ChatModule } = require('../../../Model/DB_structure');
const jwt  = require('jsonwebtoken');
const { notification } = require('../../../config/notification/notication');
const { addNotification } = require('../Notification/notication');

const Connect = (server) => {

    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['*'],
        allowedHeaders: ['*'],
      },
      });

      io.on('connection', (socket) => {
        socket.on('notification',async(data) => {
          console.log(data)
          const result =  await addNotification(data)
          console.log(result)
          if(result){
            socket.emit('new_notification',result)
          }
        })
        socket.on('disconnect',() => {
          console.log('A user disconnected' + socket.id);
        })
      });

}


module.exports = Connect;