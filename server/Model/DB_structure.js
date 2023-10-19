// MongoDB Schema for Farmers
const farmerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String, // You should securely hash and salt passwords
    phoneNumber: String,
    location: String,
    farmName: String,
    farmDescription: String,
    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
    verificationStatus: String, // Status could be 'Pending', 'Verified', 'Rejected', etc.
    // Other fields for verification documents, such as identity cards, certificates, etc.
    // You can also include fields for geolocation data (latitude and longitude) to pinpoint the farm's location.
  });
  
  // MongoDB Schema for Products
  const productSchema = new Schema({
    title: String,
    description: String,
    category: String, // e.g., 'Vegetables', 'Fruits', 'Dairy', 'Meat', etc.
    price: Number,
    quantityAvailable: Number,
    images: [String], // Store image URLs or references
    farmer: {
      type: Schema.Types.ObjectId,
      ref: 'Farmer',
    },
    // Other fields related to product details
    // You can include fields for product ratings and reviews.
  });
  
  // MongoDB Schema for User Accounts
  const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    conPassword: String,
    ActivationCode: Number,
    // Securely hashed and salted
    // Other user-related fields, e.g., role (buyer, admin), profile picture, etc.
  });
  
  // MongoDB Schema for Transactions
  const transactionSchema = new Schema({
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantityPurchased: Number,
    totalPrice: Number,
    status: String, // e.g., 'Pending', 'Completed', 'Canceled', etc.
    // Other transaction-related fields, such as timestamps, shipping details, etc.
  });
  
  // MongoDB Schema for Reviews and Ratings
  const reviewSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    rating: Number, // Numeric rating (e.g., 1 to 5)
    text: String, // Review text
    // Other fields related to reviews, like timestamps, helpful votes, etc.
  });
  
  // Define models based on the schemas
  const Farmer = mongoose.model('Farmer', farmerSchema);
  const Product = mongoose.model('Product', productSchema);
  const User = mongoose.model('User', userSchema);
  const Transaction = mongoose.model('Transaction', transactionSchema);
  const Review = mongoose.model('Review', reviewSchema);

module.exports = {Farmer,Product,User,Transaction,Review}  