const mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  userID: String,
  guildID: String,
  joinDate: Number,
  postCooldown: Boolean,
  posts: Number
});

module.exports = mongoose.model('Member', memberSchema);
