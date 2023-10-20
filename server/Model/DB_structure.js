const mongoose = require('mongoose');

// Define your schemas
  // MongoDB Schema for Farmers
const farmerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, // You should securely hash and salt passwords
  phoneNumber: String,
  location: String,
  farmName: String,
  farmDescription: String,
  products: [{
    type: String,
    ref: 'Product',
  }],
  verificationStatus: String,
  // Status could be 'Pending', 'Verified', 'Rejected', etc.
  // Other fields for verification documents, such as identity cards, certificates, etc.
  // You can also include fields for geolocation data (latitude and longitude) to pinpoint the farm's location
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  // ... other fields
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // ... other fields
});

const transactionSchema = new mongoose.Schema({
  transactionNumber: { type: Object }
});

const reviewSchema = new mongoose.Schema({
  // ... fields
  remark: { type: Object}
});
const BanUser = mongoose.Schema({
  username: { type: String, required: true},
  email: {type: String,required:  true}
})
// Define models based on the schemas
const BlockedUser = mongoose.model('BlockedUsers', BanUser)
const Farmer = mongoose.model('Farmer', farmerSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Farmer, Product, User, Transaction, Review, BlockedUser };
