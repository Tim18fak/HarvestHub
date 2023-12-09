const { Product } = require("../../../../Model/DB_structure")

const otherProduce = async(produceID,id) => {
    console.log(produceID)
    const otherProduces = []
    const others =  produceID.filter((ids) => ids !== id)
    for(let i = 0;i < others.length;i++){
        const result = await Product.findById(others[i])
        if(result){
            otherProduces.push(result)
        }
    }
    return otherProduces

}
module.exports ={otherProduce}