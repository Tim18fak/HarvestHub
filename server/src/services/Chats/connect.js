const { Server } = require('socket.io');
const { ChatModule, ActiveFarmer, ActiveConsumer, Farmer, User, ActiveAdmin } = require('../../../Model/DB_structure');
const jwt  = require('jsonwebtoken');
const { notification } = require('../../../config/notification/notication');
const { addNotification } = require('../Notification/notication');
const { getAdminConnectionId, getUser, getConsumerIdAndInfo, getFarmerIdAndInfo } = require('../Admin/adminFeatures');

const Connect = (server) => {

    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['*'],
        allowedHeaders: ['*'],
      },
      });

      io.on('connection', async(socket) => {
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
        /* active user logout initialization */
        socket.on('logout_Init',async(data) => {
          const {_id,isFarmer} = data 
          console.log(data)
          const active = isFarmer ? await ActiveFarmer.findOne({Farmer: _id}) : await ActiveConsumer.findOne({Consumer: _id})
          const removeActive = isFarmer ? ActiveFarmer.findByIdAndDelete(active._id): ActiveConsumer.findByIdAndDelete(active._id)
          console.log(active)
          if(removeActive){
            console.log('active user has been removed')
          }
        })
        /* get active User */
        socket.on('active',async(data) => {
          const {isFarmer,_id} = data
          const activeUser = isFarmer ? await ActiveFarmer.findOne({Farmer: _id}) : await ActiveConsumer.findOne({Consumer: _id})
          const activeAdmin =  await ActiveAdmin.find({})
          if(activeUser){
            const totalConsumer = await ActiveConsumer.countDocuments()
            const totalFarmer = await ActiveFarmer.countDocuments()
            console.log(totalConsumer, totalFarmer)
            const adminconnectId = await getAdminConnectionId(activeAdmin)
            adminconnectId.forEach(id => {
              io.to(id).emit('activeUser',{totalConsumer, totalFarmer})
              console.log('user sent')
            })
            console.log('done')
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
          const adminconnectId = await getAdminConnectionId(activeAdmin)
            adminconnectId.forEach(id => {
              io.to(id).emit('activeUser',{totalConsumer, totalFarmer})
              console.log('user sent')
            })
            console.log('done')
        })
    /* disconnect */
        socket.on('disconnect',() => {
          console.log('A user disconnected' + socket.id);
        })
        /* login in logic */
        socket.on('loginIN',async(data) => {
          const {id,isFarmer} = data
          const foundUser = isFarmer ? await Farmer.findById(id) : await User.findById(id);
          if(!foundUser){
            socket.disconnect(true)
          }
          foundUser.connectionId = connectionId;
          await foundUser.save()
          console.log('user connectionid saved')
        })
        /* set active admin */
        socket.on('activeAdmin',async(data) => {
          console.log(connectionId)
          const {adminAuthToken,token} = data.admin
          const admin = await ActiveAdmin.findOne({AdminId: token})
          if(admin){
            admin.adminConnectionId = connectionId;
            await admin.save()
            console.log('a new connection id was added')
            return
          }
          
          const activeAdmin =  new ActiveAdmin({
            date: new Date(),
            adminConnectionId: connectionId,
            AdminId:token
          })
         await activeAdmin.save()
          console.log('active admin added')
        })
        /* send active user number to admin */
        socket.on('adminLogin',async() => {
          const totalConsumer = await ActiveConsumer.countDocuments()
          const totalFarmer = await ActiveFarmer.countDocuments()
          const admin = await ActiveAdmin.find({})
          const id = await getAdminConnectionId(admin)
          
          id.forEach(id => {
              io.to(id).emit('activeUser',{totalConsumer, totalFarmer})
    })
    /* get active Consumer Info */
    const activeConsumerInfo = await getConsumerIdAndInfo()
    const activeFarmerInfo = await getFarmerIdAndInfo()
    console.log(activeFarmerInfo)
    id.forEach(id => {
      io.to(id).emit('activeUserInfo',{activeConsumerInfo,activeFarmerInfo})
    }) 
        })
      });

}


module.exports = Connect;