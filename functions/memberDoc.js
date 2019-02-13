module.exports.update = (msg) => {
  const mongoose = require('mongoose');
  const updateMemberDoc = require('./updateMemberDoc.js');
  var Member = require('./schemas/memberSchema.js');


  //need to check this due to a glitch with this module and allMemberDocs running
  //at the same time, creating 2 docs
  if (msg.content != 'T init') {
    //if no member doc is found, create a new one
    //otherwise, update their existing doc with updateMemberDoc.js
    Member.find({userID: msg.member.id, guildID: msg.guild.id}, (err, docs) => {
      if (err) {
        console.log(err);
      } else if (docs.length == 0) {
        var newMember = new Member({
          userID: msg.member.id,
          guildID: msg.guild.id,
          joinDate: msg.member.joinedTimestamp,
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
        updateMemberDoc.update(msg, docs);
      }
    })
  }
};
