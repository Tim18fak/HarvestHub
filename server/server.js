const https = require('https');
/* const Mongodb = require('./mongodb') */
const fs = require('fs');
const express = require('express');

const app = express();
// Routes
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
/* app.use('auth', authRoutes) */
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});
