const Mongodb = require('./mongodb');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

/* const chat = require('./Routes/Chat'); */
const authRoutes = require('./Routes/auth.js');
const farmerRoutes = require('./Routes/farmerUser');

const corsOptions = {
  origin: '*', // Replace with the origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Specify allowed headers
};

const app = express();
app.use(express.json());
// Use the cors middleware with your options
app.use(cors());

const server = app.listen(80, () => {
  console.log('Server is running on http://localhost');
});

const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from your React app's domain
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected' + socket.id);
});

// Add your routes and endpoints here
app.use("/productimages", express.static("uploads"));
app.use("/profileimages", express.static("ProfileImages"));
app.use('/farmerUser', farmerRoutes);
app.use('/auth', authRoutes);
/* app.use('/chat', chat); */

app.get('/', (req, res) => {
  res.send('Hello, HTTP World!');
});
