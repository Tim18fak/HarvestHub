const mongoose = require('mongoose');

// Define your schemas
  // MongoDB Schema for Farmers
const farmerSchema = new mongoose.Schema({
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  hashedPassword: {type: String, required: true},
  email: {type: String, required: true},
  Ip: { type: String, required: true},
  Code: { type: Number, required: true}, // You should securely hash and salt passwords
  phoneNumber: { type: Number},
  isFarmer: {type: Boolean},
  location: { type: String},
  farmName: { type: String},
  farm_Address: { type: String},
  farmDescription: { type: String},
  home_Address: { type: String},
  aboutYourself: { type: String},
  profileImage: { type: String},
  products: [{
    type: String,
    ref: 'Product',
  }],
  verificationStatus: { type: String},
  nationalId: { type: String},
  // Status could be 'Pending', 'Verified', 'Rejected', etc.
  // Other fields for verification documents, such as identity cards, certificates, etc.
  // You can also include fields for geolocation data (latitude and longitude) to pinpoint the farm's location
});

const productSchema = new mongoose.Schema({
  description: { type: String, /* required: true */},
  Image: { type: Array, /* required: true */},
  location: { type: String, /* required: true */},
  date: { type: Date, /* required: true */},
  quantity: { type: String},
  price: { type: String},
  catergory: { type: String},
  Farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer' // 'Seller' should match the name of the Seller model
  },
  // ... other fields
});

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  hashedPassword: {type: String, required: true},
  email: {type: String, required: true},
  Ip: { type: String, required: true},
  Code: { type: Number, required: true},
  aboutYourself: { type: String},
  isFarmer: {type: Boolean ,required: true}

  // ... other fields
});

const transactionSchema = new mongoose.Schema({
  transactionNumber: { type: Object }
});

const reviewSchema = new mongoose.Schema({
  // ... fields
  remark: { type: Object}
});
const Banned  = new mongoose.Schema({
  // ... fields
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
});
const adminInfo = new mongoose.Schema({
  adminId: { type: String, required: true},
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  activationCode: { type: Number},
  activationCodeStatus: { type: String, required: true},
})



const BlockedUser = mongoose.model('BannedUser', Banned );
const Admin = mongoose.model('Admin',adminInfo)
const Farmer = mongoose.model('Farmer', farmerSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Farmer, Product, User, Transaction, Review, BlockedUser, Admin };
