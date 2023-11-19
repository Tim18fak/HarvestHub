const http = require('http'); // Change 'https' to 'http'
const Mongodb = require('./utils/DataBase/mongodb');
const fs = require('fs');
const cron = require('node-cron')
const express = require('express');
const { Server } = require('socket.io');
const {Admin,Farmer,User} = require("./Model/DB_structure")
/* const chat = require('./Routes/Chat'); */
const authRoutes = require('./Routes/auth.js');
const farmerRoutes = require('./Routes/farmerUser');
const clientUser = require('./Routes/User')
const admin = require('./Routes/admin')

const app = express();
app.use(express.json()); // This is important to be able to send info from the client to my server

// Routes
const chat = require('./Routes/Chat');
const { cors,corsOptions } = require('./middlewares/cors');
const { authenticateAdminToken, authenticateClientToken } = require('./middlewares/authenticateToken');


const server = http.createServer(app); // Change 'https' to 'http'

const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from your React app's domain
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected' + socket.id);
});
server.listen(80, () => { 
  console.log('Server is running on http://localhost');
});

// Route links
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // Other CORS headers and configurations can be added here
  next();
});

app.use(cors(corsOptions));
app.use("/productimages", express.static("uploads"));
app.use("/profileimages", express.static("ProfileImages"));
app.use('/farmerUser', authenticateClientToken,farmerRoutes);
app.use('/auth', authenticateClientToken,authRoutes);
app.use('/chat', chat);
app.use('/admin',authenticateAdminToken,admin)
app.use('/client',authenticateClientToken,clientUser)
app.get('/', (req, res) => {
  res.send('Hello, HTTP World!');
});

/* database cleaning */
async function deleteUnverifiedAdminActivationcode(collection) {
  try {
    const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
    console.log(`Deleted ${result.deletedCount} admin with a status 'Pending'.`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
}
async function deleteUnverifiedUserActivationcode(collection){
  try {
    const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
    console.log(`Deleted ${result.deletedCount} user account  with a status 'Pending'.`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
}
async function deleteUnverifiedFarmerActivationcode(collection){
  try {
    const result = await collection.deleteMany({ activationCodeStatus: 'Pending' });
    console.log(`Deleted ${result.deletedCount} farmer with a status 'Pending'.`);
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
}

cron.schedule('0/1 * * * *', () => {
    console.log('Running task...');
    deleteUnverifiedAdminActivationcode(Admin);
    deleteUnverifiedUserActivationcode(User)
    deleteUnverifiedFarmerActivationcode(Farmer)});
