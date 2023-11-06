const https = require('https');
const Mongodb = require('./mongodb')
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io')


/* const chat = require('./Routes/Chat') */
const authRoutes = require('./Routes/auth.js')
const farmerRoutes = require('./Routes/farmerUser')


const corsOptions = {
  origin: "*",
};

const app = express();
app.use(express.json()); // this is important to be able eto send info from the client to my server
// Routes
const chat = require('./Routes/Chat')
/* const authRoutes = require('./Routes/auth.js') */
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'jewel',
};

const server = https.createServer(options, app);

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
server.listen(443, () => {
  console.log('Server is running on https://localhost');
});
// route links
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // Other CORS headers and configurations can be added here
  next();
});
app.use(cors(corsOptions));
app.use("/productimages", express.static("uploads"));
app.use("/profileimages", express.static("ProfileImages"));
app.use('/farmerUser',farmerRoutes)
app.use(cors(corsOptions));
app.use('/auth', authRoutes)
app.use('/chat', chat)
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});