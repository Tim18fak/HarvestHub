 const ReqInfo = (req) => {
    const userid = req.query.userid
    const {description, quantity,price, category,location,date} = req.body
    const {image} = req.files
    const productImages = []
    for(let i = 0; i < image.length; i++){
        const imagePath = `https://localhost/productimages/${image[i].filename}`
        productImages.push(imagePath)
    }

    return {productImages,description, quantity,price, category,location,date,userid}
}

module.exports = { ReqInfo }