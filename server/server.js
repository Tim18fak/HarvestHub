const http = require('http'); // Change 'https' to 'http'
const Mongodb = require('./mongodb');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
/* =======
const Mongodb = require('./mongodb');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

/* const chat = require('./Routes/Chat'); */
const authRoutes = require('./Routes/auth.js');
const farmerRoutes = require('./Routes/farmerUser');
const clientUser = require('./Routes/User')
const admin = require('./Routes/admin')
const corsOptions = {
  origin: "*",
};

const app = express();
app.use(express.json()); // This is important to be able to send info from the client to my server

// Routes
const chat = require('./Routes/Chat');

const server = http.createServer(app); // Change 'https' to 'http'
/* =======
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // Other CORS headers and configurations can be added here
  next();
});

const server = app.listen(80, () => {
  console.log('Server is running on http://localhost');
});
>>>>>>> 4534c52d3f4fbab03dbdb0bb1e12fac698216476 */

const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from your React app's domain
    methods: ['GET', 'POST'],
  },
});

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
app.use('/admin',admin)
app.use('/client',clientUser)
app.get('/', (req, res) => {
  res.send('Hello, HTTP World!');
});


