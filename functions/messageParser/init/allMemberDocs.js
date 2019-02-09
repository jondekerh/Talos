module.exports.create = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./../autoDelete.js');
  var Member = require('../../schemas/memberSchema.js');


  msg.guild.members.forEach(function(guildMember) {

    var newMember = new Member({
      userID: guildMember.user.id,
      guildID: guildMember.guild.id,
      joinDate: guildMember.joinedTimestamp,
      postCooldown: false,
      posts: 0
    });

    newMember.save(err => {
      if (err) {
        console.log(err);
        return;
      }
    })
  })
};
