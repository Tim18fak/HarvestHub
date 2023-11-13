const productFilter = (resultSearch) => {
   const filteredResult = resultSearch.map((result) => {
    const {_id,description,Image,date,quantity,price,Farmer} = result;
    const {aboutYourself,fullname,phoneNumber,profileImage,farmName} = Farmer;
    return {_id,description,Image,date,quantity,price,aboutYourself,fullname,phoneNumber,profileImage,farmName}
   })
      return filteredResult
} 

module.exports ={productFilter}