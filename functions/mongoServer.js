const mongoose = require('mongoose');

module.exports.connect = () => {
  //connect to server
  mongoose.connect('mongodb://localhost:27017');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to local database')
  })
};
