const https = require('https');
const Mongodb = require('./mongodb')
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: "*",
};



const app = express();
app.use(express.json()); // this is important to be able eto send info from the client to my server
// Routes
const chat = require('./Routes/Chat')
const authRoutes = require('./Routes/auth.js')
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'jewel',
};

const server = https.createServer(options, app);

server.listen(443, () => {
  console.log('Server is running on https://localhost');
});
// route links
app.use(cors(corsOptions));
app.use('/auth', authRoutes)
app.use('/chat', chat)
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});

