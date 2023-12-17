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
          const isfarmer =  isFarmer.toString()
          console.log(typeof isfarmer)
          const removeUser = isfarmer === 'true'? await ActiveFarmer.findOne({Farmer: _id}) : await ActiveConsumer.findOne({Consumer: _id});
          console.log(removeUser)

          /* remove the logout user and get the current active admin */
          if(removeUser){
            const deleteActiveUser =  isfarmer === 'true' ? await ActiveFarmer.findByIdAndRemove(removeUser._id) : await ActiveConsumer.findByIdAndRemove(removeUser._id)
            if(deleteActiveUser){
              await getTotalUSer(io)
              socket.emit('logout_SequenceCompleted')
            }
          }
          
          
        })
        /* get active User */
        socket.on('active',async(data) => {
          const {isFarmer,_id} = data
          const activeUser = isFarmer ? await ActiveFarmer.findOne({Farmer: _id}) : await ActiveConsumer.findOne({Consumer: _id})
          if(activeUser){
            /* const totalConsumer = await ActiveConsumer.countDocuments()
            const totalFarmer = await ActiveFarmer.countDocuments()
            console.log(totalConsumer, totalFarmer)
            const adminconnectId = await getAdminConnectionId(activeAdmin)
            adminconnectId.forEach(id => {
              io.to(id).emit('activeUser',{totalConsumer, totalFarmer})
              console.log('user sent')
            })
            console.log('done') */
            await getTotalUSer(io);
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
          await getTotalUSer(io)
         /*  const totalConsumer = await ActiveConsumer.countDocuments()
          const totalFarmer = await ActiveFarmer.countDocuments()
          const adminconnectId = await getAdminConnectionId(activeAdmin)
            adminconnectId.forEach(id => {
              io.to(id).emit('activeUser',{totalConsumer, totalFarmer})
              console.log('user sent')
            })
            console.log('done') */
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
          getTotalUSer(io)
        })
      /* admin logout and deactivation logic*/
      socket.on('adminLogoutInitialization',async(data) => {
        try {
          const {token,id} = data
        const activeadmin =  await ActiveAdmin.findOne({AdminId: token})
        console.log(activeadmin)
        if(activeadmin){
          const removeActiveAdmin =  await ActiveAdmin.findByIdAndRemove(activeadmin._id)
          console.log(removeActiveAdmin)
         return io.to(removeActiveAdmin.adminConnectionId).emit('adminLogoutCompleted')
        }
        console.log('admin not found')
        } catch (error) {
          console.log(error.message)
        }
      })
      });

}


const getTotalUSer = async (io) => {
  const totalConsumer = await ActiveConsumer.countDocuments();
  const totalFarmer = await ActiveFarmer.countDocuments();
  const admin = await ActiveAdmin.find({});
  const ids = await getAdminConnectionId(admin);

  if (ids) {
    ids.forEach((id) => {
      io.to(id).emit('activeUser', { totalConsumer, totalFarmer });
    });
  }

  // Use `ids` instead of `id` here
  const activeConsumerInfo = await getConsumerIdAndInfo();
  const activeFarmerInfo = await getFarmerIdAndInfo();
  if (ids) {
    ids.forEach((id) => {
      io.to(id).emit('activeUserInfo', { activeConsumerInfo, activeFarmerInfo });
    });
  }

  console.log('done');
};





module.exports = Connect;