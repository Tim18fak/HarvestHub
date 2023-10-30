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
  location: { type: String},
  farmName: { type: String},
  farmDescription: { type: String},
  verificationStatus: { type: String},
  nationalId: { type: String},
  // Status could be 'Pending', 'Verified', 'Rejected', etc.
  // Other fields for verification documents, such as identity cards, certificates, etc.
  // You can also include fields for geolocation data (latitude and longitude) to pinpoint the farm's location
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, required: true},
  Image: { type: String, required: true},
  location: { type: String, required: true},
  date: { type: Date},
  Farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer' // 'Farmer' should match the name of the Farmer model
  },
});

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true},
  username: { type: String, required: true},
  hashedPassword: {type: String, required: true},
  email: {type: String, required: true},
  Ip: { type: String, required: true},
  Code: { type: Number, required: true}

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
  email: { type: String, required: true}
});
// Define models based on the schemas
const BlockedUser = mongoose.model('BannedUser', Banned );
const Farmer = mongoose.model('Farmer', farmerSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Farmer, Product, User, Transaction, Review, BlockedUser  };
