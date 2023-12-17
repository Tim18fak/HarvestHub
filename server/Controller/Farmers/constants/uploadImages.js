const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dymlitogk', 
    api_key: '314657397837536', 
    api_secret: 'vYoPrdEoX-ykZNNUtX31ZrXg-nQ' 
  });

const uploadImages  = async(images) => {
    try {
        const folderName = 'produceImages';
        const uploadPromises = images.map((image) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image, { folder: folderName },(err, result) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                console.log('Image uploaded successfully. URL:', result.secure_url);
                resolve(result.secure_url);
              }
            });
          });
        });
    
        // Wait for all uploads to complete
        const imagesUrl = await Promise.all(uploadPromises);
    
        console.log(imagesUrl);
        return imagesUrl;
      } catch (error) {
        console.log(error.message);
      }
}
const uploadProfileImage = (image,isFarmer) => {
  return new Promise((resolve, reject) => {
    try {
      const folderName = isFarmer ? 'profileImages/farmerProfileImage': 'profileImages/consumerProfileImage';
      cloudinary.uploader.upload(image, { folder: folderName }, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const URL = result.secure_url;
          console.log('Image uploaded successfully. URL:', result.secure_url);
          resolve(URL);
        }
      });
    } catch (error) {
      console.error(error.message);
      reject(error);
    }
  });
};
module.exports = {uploadImages,uploadProfileImage}