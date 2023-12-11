const express = require('express')
const router = express.Router()
const {searchProduct, product} = require('../Controller/User/searchProduct');
const { User, Product, Bookmark, Review } = require('../Model/DB_structure');
const { otherProduce } = require('../src/services/ClientFeatures/ProduceLogic/produceLogic');
const { FindFarmerID, ReviewerInfo, ReviewerFound } = require('../src/services/produce_Review/review');
router.post('/searchproduct', async(req,res) => {
   try {
    const {searchTitle,selectedCategories,} =  req.body
    console.log(req.body)
    const produce =  await Product.find({})
    const filteredProducts = produce.filter(product => {
        return (
            product.title.includes(searchTitle) ||
            product.description.includes(searchTitle)
        );
    })
    console.log(filteredProducts)
   return res.json(filteredProducts)
   } catch (error) {
    console.log(error.message)
   }
});
router.get('/p/:produceId',async(req,res) => {
   try{
    const id = req.params.produceId
    const produce =  await Product.findById(id).populate({ path: 'Farmer' });
    if(produce.Farmer === null){
        return res.json({'message': 'Farmer no longer exist'})
    }
    const {title,description,Image,location,date,quantity,price,category,Farmer,_id} = produce;
    const {fullname,username,products,profileImage,phoneNumber,farmType,farm_Address,verificationStatus} = Farmer
    const otherProduces =  await otherProduce(products,id)
    console.log(products.length)
    res.json({title,description,Image,location,date,quantity,price,category,fullname,username,_id,profileImage,phoneNumber,farmType,farm_Address,verificationStatus,'otherProduce': otherProduces})
   }
   catch(err){

   }
})
/* bookmark produce */
router.post('/bmrK/:consumerId/:produceId', async (req, res) => {
    try {
        const {consumerId,produceId} =  req.params
        console.log(req.params)
        const existConsumerBookmark = await Bookmark.findOne({ consumerId: consumerId });

        if (!existConsumerBookmark) {
            const newBookmark = new Bookmark({
                consumerId: consumerId,
                product: [produceId], // Wrap the product ID in an array
            });

            await newBookmark.save();
            console.log('Saved');
            return res.status(200).json({'message': existConsumerBookmark._id});
        }

        const produce = existConsumerBookmark.product;

        if (produce.includes(produceId)) {
            console.log('Produce has been bookmarked already')
            return res.status(400).json({'message':'Produce has been bookmarked already'});
        }

        existConsumerBookmark.product.push(produceId);
        await existConsumerBookmark.save();
        console.log('Bookmarked');
        return res.status(200).json({'message': existConsumerBookmark._id});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
});
/* get bookmarked produce */
router.get('/gT/bmrK/:consumerId', async(req,res) => {
    const results = []
    const bookmarkedProduce =  await Bookmark.findOne({consumerId: req.params.consumerId})
    if(!bookmarkedProduce){
        return
    }
    for(let i = 0;i < bookmarkedProduce.product.length;i++){
        const populatedProduce = await Product.findById(bookmarkedProduce.product[i])
        results.push(populatedProduce);
    }
    console.log(results)
    return res.status(200).json({'bookmark': results})
})
/* remove a bookmark produce */
router.put('/uP/bmrK/:consumerId/:produceId', async (req, res) => {
    try {
        const consumerBookmark = await Bookmark.findOne({ consumerId: req.params.consumerId });
        console.log(req.params.consumerId)
        if (!consumerBookmark) {
            return res.status(404).send('No bookmarks found for the consumer');
        }

        const index = consumerBookmark.product.indexOf(req.params.produceId);

        if (index !== -1) {
            consumerBookmark.product.splice(index, 1);
            await consumerBookmark.save();
            return res.status(200).json({'message': `${req.params.produceId}`});
        } else {
            return res.status(404).json({'message': `Produce not found in bookmarks`});
        }
    } catch (error) {
        console.error('Error removing bookmark:', error);
        res.status(500).json({'message': 'Internal Server Error'});
    }
});
router.post('/review/:produceId/:reviewerId',async(req,res) => {
    try {
        const { Image,
            description,
            title,
            username,
            fullname,
            review} = req.body  
            const {produceId,reviewerId} = req.params

            const produceReviewObjectExist =  await Review.findOne({
                produceId: produceId
            })
            const farmerID =  await FindFarmerID(produceId)
            const reviewerStatus= await ReviewerInfo(reviewerId)

            /* if(!reviewerStatus){
                console.log('bad')
                return res.sendStatus(403).json({'message':"You can't review any produce yet, you have not been verified"})
            } */
            if(!produceReviewObjectExist){
                const Reviewed =  new Review({
                    produceId,
                    FarmerId: farmerID,
                    remark: [{
                        produceImage: Image,
                        produceDescription: description,
                        produceTitle: title,
                        produceSellerUsername: username,
                        reviewFullname: fullname,
                        review,
                        reviewerId
                    }]
                });
                await Reviewed.save()
                return res.status(204).json({'message':'You added a new review'})
            }else{
                const hasReviewerReview = await ReviewerFound(produceId,reviewerId)
                if(hasReviewerReview){
                    return res.status(403).json({'message': 'You have reviewed this produce'})
                }
                produceReviewObjectExist.remark.push({produceImage:Image,
                    produceDescription:description,
                    produceTitle:title,
                    produceSellerUsername:username,
                    reviewFullname:fullname,
                    review,
                    reviewerId})
                    await produceReviewObjectExist.save()
                    return res.status(204).json({'message': 'you added your review to this produce'})
            }
            
    } catch (error) {
        console.log(error)
    }
})
router.get('/review/getreview/:consumerId',async(req,res) => {
    let ReviewProduce = []
    const {consumerId} = req.params
    const review =  await Review.find({})
    review.forEach((value) => {
        value.remark.forEach((val,index) => {
            if(val.reviewerId === consumerId){
               ReviewProduce.push(value)
            }
        })
    })
    console.log(ReviewProduce)
    res.send(ReviewProduce)
})
module.exports = router