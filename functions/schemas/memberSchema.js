const mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  userID: String,
  guild_id: String,
  joinDate: Number, //use guildMember.joinedtimestamp for this
  lastPost: Number,
  posts: Number
});

module.exports = mongoose.model('Member', memberSchema);
