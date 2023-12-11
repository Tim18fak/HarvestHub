const { Farmer, Product, User, Review } = require("../../../Model/DB_structure")

const FindFarmerID = async(produceid) => {
    const id =  await Product.findById(produceid)
    return id.Farmer;
}

const ReviewerInfo =  async(reviewerId) => {
    let status;
    const info =  await User.findById(reviewerId)
    if(info.verificationStatus === 'Fulfilled'){
    status = true
    return status
    }else if(info.verificationStatus === 'Pending'){
        status = false
        return status
    }
}

const ReviewerFound = async(produceId,reviewerId) => {
    const review = await Review.findOne({produceId:produceId})
    console.log(review)
    const result =  review.remark.some((value) => value.reviewerId === reviewerId)
    console.log(result)
    return result
    
}
module.exports = {FindFarmerID,ReviewerInfo,ReviewerFound }