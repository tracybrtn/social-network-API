//Import connect and connection from Mongoose 
const { connect, connection } = require('mongoose');

//set up connection to MongoDB
connect(process.env.MONGODB_URI || 'mongodb://localhost/developersApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Export connection
module.exports = connection;