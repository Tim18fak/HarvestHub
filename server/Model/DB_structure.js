const mongoose = require('mongoose');

// Define your schemas
  // MongoDB Schema for Farmers
const farmerSchema = new mongoose.Schema({
  /* Personal Info */

  Id: { type: String, required: true},
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  hashedPassword: {type: String, required: true},
  email: {type: String, required: true},
  Ip: { type: String, required: true},
  profileImage: {type:String},
  phoneNumber: { type: Number},
  NIN: { type: String},
  isFarmer: {type: Boolean ,required: true},
  address: { type: String},
  aboutYourself: { type: String},
  driverLicence: {type:String},

  /* Farm info */

  farmName: { type: String},
  farmType:{type:String},
  farm_Address: { type: String},
  farmDescription: { type: String},
  farmingExperience: {type: Number},

  products: [{
    type: String,
    ref: 'Product',
  }],

  /* Notification */

  notification: [
    {
      date: {type: Date},
      message: {type: Object}
    }
  ],
  seenNotification:{ type: Date},

  /* Verification */

  verificationStatus: { type: String},
  activationCode: { type: Number},
  activationCodeStatus: { type: String, required: true},
  authorizationToken: { type: String},

  /* Others */
  comeAbout: {type: String}
  // Status could be 'Pending', 'Verified', 'Rejected', etc.
  // Other fields for verification documents, such as identity cards, certificates, etc.
  // You can also include fields for geolocation data (latitude and longitude) to pinpoint the farm's location
});

const productSchema = new mongoose.Schema({
  title: { type: String, /* required: true */},
  description: { type: String, /* required: true */},
  Image: { type: Array, /* required: true */},
  location: { type: String, /* required: true */},
  date: { type: Date, /* required: true */},
  quantity: { type: String},
  price: { type: String},
  category: { type: Array},
  Farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer' // 'Seller' should match the name of the Seller model
  },
  // ... other fields
});

const userSchema = new mongoose.Schema({
  /* PErsonal Info */

  Id: { type: String, required: true},
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  hashedPassword: {type: String, required: true},
  address: {type: String},
  NIN: {type: String},
  phoneNumber: {type: Number},
  profileImage: {type: String},
  email: {type: String, required: true},
  Ip: { type: String, required: true},
  aboutYourself: { type: String},
  isFarmer: {type: Boolean ,required: true},
  
  /* Notification */

  notification: [
    {
      date: {type: Date},
      message: {type: String} 
    }
  ],
  seenNotification:{ type: Date},

  /* Verification */

  authorizationToken: { type: String},
  activationCode: { type: Number},
  activationCodeStatus: { type: String, required: true},
  // ... other fields

  comeAbout:{type: String},
});

const transactionSchema = new mongoose.Schema({
  transactionNumber: { type: Object }
});
const bookmarkSchema =  new mongoose.Schema({
  consumerId: {
    type: String,
    ref: 'User'
  },
  product:[{
    type : String,
    ref: 'Product'
  }]
})
const reviewSchema = new mongoose.Schema({
  // ... fields
  remark: { type: Object}
});
const Banned  = new mongoose.Schema({
  // ... fields
  username: { type: String, },
  email: { type: String,},
  Ip: { type: String, }
});
const adminInfo = new mongoose.Schema({
  adminId: { type: String, required: true},
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  activationCode: { type: Number},
  activationCodeStatus: { type: String, required: true},
  authorizationToken: { type: String},
})
const chatMessage = mongoose.Schema({
  chatId: {type: String},
  username: {type: String},
  adminUsername: {type:String},
  message: {type: Array}
})
const BlockedUser = mongoose.model('BannedUser', Banned );
const Admin = mongoose.model('Admin',adminInfo)
const Farmer = mongoose.model('Farmer', farmerSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Review = mongoose.model('Review', reviewSchema);
const ChatModule = mongoose.model('chatMessage',chatMessage)
const Bookmark =  mongoose.model('Bookmark',bookmarkSchema)
module.exports = { Farmer, Product, User, Transaction, Review, BlockedUser, Admin,ChatModule,Bookmark };
