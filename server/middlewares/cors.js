const cors = require('cors');

const corsOptions = {
    origin: "*",
    methods: 'POST,DELETE,GET'
  };
  
module.exports ={cors,corsOptions}