const {User,Farmer,BlockedUser} = require('../../../Model/DB_structure')

const getAllFarmer = async(req,res) =>{
    const AllFarmer = await Farmer.find({})
    res.status(200).json({AllFarmer})
}
const getAllConsumer  = async(req,res) => {
    const AllConsumer = await User.find({})
    res.status(200).json({AllConsumer})
}
const BlockFarmer = async(req,res) => {
    try {
        const blockFarmerId = req.params.blockFarmerId;
        console.log(blockFarmerId)
    const blockFarmerInfo = await Farmer.findOne({_id:blockFarmerId})
    if(!blockFarmerInfo){
       throw new Error(`${blockFarmerId} is  not in the database`)
    }
    const {email,Ip,username} =  blockFarmerInfo
    const newBannnedFarmer =  await  new BlockedUser({
        email,
        Ip,
        username
    })
    newBannnedFarmer.save()
    .then(async (data) => {
        if(!data){
            console.log("Farmer Has Not Been Banned, Code Not Working")
        }
        const deleteFarmer = await Farmer.findByIdAndDelete(blockFarmerId)
        if(!deleteFarmer){
            console.log(`${blockFarmerId} has not been deleted`)
        }
        return res.status(200).json({'message': `${deleteFarmer.username} has been Banned and Deleted From Our Database`})
    })
    } catch (error) {
        console.log(error.message)
    }
}
const blockConsumer = async (req,res) => {
    try {
        const bannedConsumerId =  req.params.banConsumerId;
    const bannedConsumerInfo =  await User({_id: bannedConsumerId});
    if(!bannedConsumerId){
        throw new Error(`${bannedConsumerId} is not found on the User Database Collection`)
    }
    const {email,Ip,username} = bannedConsumerInfo;
    const newlyBannedConsumer = await new BlockedUser({
        email,
        Ip,
        username
    })
    newlyBannedConsumer.save()
    .then(async (data) => {
        if(!data){

        }
        const deleteConsumerInfo = await User.findByIdAndDelete(bannedConsumerId)
        if(!deleteConsumerInfo){
            res.status(401).json({'message':`${bannedConsumerId} not found`})
        }
        res.status(202).json({'message': `${deleteConsumerInfo.username} has been deleted`})
    })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {getAllFarmer,getAllConsumer,BlockFarmer,blockConsumer}