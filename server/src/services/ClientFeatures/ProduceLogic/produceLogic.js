const { Product } = require("../../../../Model/DB_structure")

const otherProduce = async(produceID,id) => {
    const otherProduces = []
    console.log(id)
    const others =  produceID.filter((ids) => ids !== id)
    for(let i = 0;i < others.length;i++){
        const result = await Product.findById(produceID)
        if(result){
            otherProduces.push(result)
        }
    }
    console.log(otherProduces)
    return otherProduces

}
module.exports ={otherProduce}