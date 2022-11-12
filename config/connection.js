//Import connect and connection from Mongoose 
const { connect, connection } = require('mongoose');

//set up connection to MongoDB
connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Export connection
module.exports = connection;