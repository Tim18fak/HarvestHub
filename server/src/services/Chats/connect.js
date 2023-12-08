const { Server } = require('socket.io');
const { ChatModule, ActiveFarmer, ActiveConsumer } = require('../../../Model/DB_structure');
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
        const connectionId =  socket.id
        socket.on('notification',async(data) => {
          const {message} = data
          console.log(data)
          const result =  await addNotification(data)
          if(result){
            console.log(result)
            setTimeout(() => {
              socket.emit('new_notification',message)
            },2000)
          }
        })
        /* get active User */
        socket.on('active',async(data) => {
          const {isFarmer,_id} = data
          const activeUser = isFarmer ? await ActiveFarmer.findOne({Farmer: _id}) : await ActiveConsumer.findOne({Consumer: _id})
          if(activeUser){
            const totalConsumer = await ActiveConsumer.countDocuments()
            const totalFarmer = await ActiveFarmer.countDocuments()
            console.log(totalConsumer, totalFarmer)
            return

          }
          const newlyLogin = isFarmer ? new ActiveFarmer({
            data: new Date(),
            connectionId: connectionId,
            Farmer: _id
          }): new ActiveConsumer({
            data: new Date(),
            connectionId: connectionId,
            Consumer: _id
          })

          await newlyLogin.save();
          const totalConsumer = await ActiveConsumer.countDocuments()
          const totalFarmer = await ActiveFarmer.countDocuments()
          console.log(totalConsumer, totalFarmer),
          socket.emit('totalActive',totalConsumer,totalFarmer)
        })
    
        socket.on('disconnect',() => {
          console.log('A user disconnected' + socket.id);
        })
      });

}


module.exports = Connect;