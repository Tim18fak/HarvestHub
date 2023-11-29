const cors = require('cors');

const corsOptions = {
    origin: "*",
    methods: 'POST,DELETE,GET,PUT'
  };
  
module.exports ={cors,corsOptions}