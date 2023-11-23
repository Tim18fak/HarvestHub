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
const Connect = require('./src/services/Chats/connect');
const { deleteUnverifiedAdminActivationcode, deleteUnverifiedFarmerActivationcode, deleteUnverifiedUserActivationcode } = require('./Database_Cleaning/database_cleaning');


const server = http.createServer(app); // Change 'https' to 'http'
/* socket.io connection */
Connect(server)

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
app.use('/farmerUser',farmerRoutes);
app.use('/auth',authRoutes);
app.use('/chat', chat);
app.use('/admin',admin)
app.use('/client',clientUser)
app.get('/', (req, res) => {
  res.send('Hello, HTTP World!');
});

/* database cleaning */
cron.schedule('0/01 * * * *', () => {
    console.log('Running task...');
    deleteUnverifiedAdminActivationcode(Admin);
    deleteUnverifiedFarmerActivationcode(Farmer);
    deleteUnverifiedUserActivationcode(User) 
  
  });
