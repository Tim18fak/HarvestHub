const cloudinary = require('cloudinary').v2
          
const Cloudinary = cloudinary.config({ 
  cloud_name: 'dymlitogk', 
  api_key: '314657397837536', 
  api_secret: 'vYoPrdEoX-ykZNNUtX31ZrXg-nQ' 
});

module.exports = {Cloudinary}