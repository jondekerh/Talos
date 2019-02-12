module.exports.create = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./../autoDelete.js');
  var Member = require('../../schemas/memberSchema.js');


  msg.guild.members.forEach(function(guildMember) {

    //need to check if guildMembers already have a doc since there is a possability
    //of guild members getting docs made before initialization
    Member.find({userID: guildMember.user.id, guildID: guildMember.guild.id}, (err, docs) => {
      if (err) {
        console.log(err);
      } else if (docs.length == 0) {
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
      } else {
        return;
      }

    })
  })
};
