module.exports.create = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./../autoDelete.js');
  var Member = require('../../schemas/memberSchema.js');

  var guildMembers = msg.guild.members.keyArray();

  for (i in guildMembers) {
    console.log(guildMembers[i]);

    //how to get these last 3 by using the array of ids?
    var newMember = new Member({
      userID: guildMembers[i],
      guild_id: msg.guild.id,
      joinDate: Number, //use guildMember.joinedtimestamp for this
      lastPost: Number,
      posts: Number
    });

  }
};
