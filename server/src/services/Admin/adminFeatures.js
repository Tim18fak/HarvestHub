const { ActiveConsumer, ActiveFarmer, ActiveAdmin, User, Farmer } = require("../../../Model/DB_structure");

const getAdminConnectionId = (admin) => {
    const id = [];
    for(let i = 0;i < admin.length; i++){
        if(admin[i].adminConnectionId !== undefined){
            console.log(admin[i])
            id.push(admin[i].adminConnectionId)
        }
    }
    return id
}
const getConsumerIdAndInfo =  async() => {
    const consumer = await ActiveConsumer.find({})
    const result = []
    console.log(consumer)
    for(let i = 0;i < consumer.length;i++){
        if(consumer[i].Consumer){
            const ConsumerResult = await User.findById(consumer[i].Consumer)
            result.push(ConsumerResult)
        }
    }
    console.log('hell')
    return result;
}
const getFarmerIdAndInfo = async() => {
    const farmer = await ActiveFarmer.find({})
    const result = [];
    console.log(farmer)
    for(let i = 0;i < farmer.length;i++){
        if(farmer[i].Farmer){
            const FarmerResult = await Farmer.findById(farmer[i].Farmer)
            result.push(FarmerResult)
        }
    }
    return result;
    
}
module.exports = {getAdminConnectionId,getConsumerIdAndInfo,getFarmerIdAndInfo}