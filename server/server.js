const http = require('http'); // Change 'https' to 'http'
const Mongodb = require('./mongodb');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const authRoutes = require('./Routes/auth.js');
const farmerRoutes = require('./Routes/farmerUser');

const corsOptions = {
  origin: "*",
};

const app = express();
app.use(express.json()); // This is important to be able to send info from the client to my server

// Routes
const chat = require('./Routes/Chat');

const server = http.createServer(app); // Change 'https' to 'http'

const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from your React app's domain
    methods: ['GET', 'POST'],
  },
}); // Create a Socket.IO server

// Define a socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected' + socket.id);
});

server.listen(80, () => { // Change the port number to 80 for HTTP
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
app.use('/farmerUser', farmerRoutes);
app.use(cors(corsOptions));
app.use('/auth', authRoutes);
app.use('/chat', chat);

app.get('/', (req, res) => {
  res.send('Hello, HTTP World!'); // Update the response message
});
