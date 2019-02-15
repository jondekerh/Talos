module.exports.update = (msg, docs) => {
  const mongoose = require('mongoose');
  var Member = require('./schemas/memberSchema.js');
  var Guild = require('./schemas/guildSchema.js');
  var memberDoc = docs[0];

  Guild.findOne({guildID: msg.guild.id}, (err, guildDoc) => {
    if (err) {
      console.log(err);
    } else if (!guildDoc) {
      //exit if no doc
      return;
    } else {
      let days = Date.now() - (guildDoc.days);
      let cooldown = guildDoc.cooldown;
      let memberRoles = msg.member.roles.keyArray();
      //console.log(memberDoc);

      if (!memberRoles.includes(guildDoc.startingRole)) {
          //if they are not at the starting role, return
          return;
      } else if (memberRoles.includes(guildDoc.startingRole || memberRoles.includes(guildDoc.grantedRole)) && memberDoc.posts >= guildDoc.posts && memberDoc.joinDate <= days) {
          //if are and they've met the criteria, promote them
          let startingRole = msg.guild.roles.find(role => role.id === guildDoc.startingRole);
          let grantedRole = msg.guild.roles.find(role => role.id === guildDoc.grantedRole);

          msg.member.removeRole(startingRole).catch(console.error);
          msg.member.addRole(grantedRole).catch(console.error);
          return;
      } else if (memberRoles.includes(guildDoc.startingRole) && memberDoc.postCooldown === false) {
          //if they are but they haven't, add a post and trigger the cooldown
          let postCount = memberDoc.posts;
          postCount++;

          Member.findOneAndUpdate({userID: msg.member.id, guildID: msg.guild.id}, {posts: postCount, postCooldown: true}, (err, doc) =>{
            if (err) {
              console.log(err);
            }
          });

          //this timeout handles the "cooldown" on users posting to make sure people don't
          //get awarded posts for being spammy. default 60 seconds
          setTimeout(function() {
            Member.findOneAndUpdate({userID: msg.member.id, guildID: msg.guild.id}, {postCooldown: false}, (err, doc) => {
              if (err) {
                console.log(err);
              }
            })
          }, cooldown);
          return;
      }
    }
  })
};
