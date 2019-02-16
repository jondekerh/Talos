const mongoose = require('mongoose');
const autoDelete = require('./autoDelete.js');
const guildDoc = require('./init/guildDoc.js');
var Guild = require('../schemas/guildSchema.js');

//muzzle function
module.exports.muzzle = (msg) => {
  if (!msg.member.hasPermission('KICK_MEMBERS')) {
    msg.channel.send('You don\'t have permission to use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    Guild.findOne({guildID: msg.guild.id}, (err, doc) => {
      if (err) {
        console.log(err);
      } else if (!doc.muzzleRole) {
        msg.channel.send('Muzzle role not yet set.')
          .then(msg => autoDelete.delete(msg));
          return;
      } else {
        let user = msg.mentions.users.first();
        if (user) {
          let member = msg.guild.member(user);
          if (member) {
            let memberRoles = member.roles.keyArray();
            if (!memberRoles.includes(doc.muzzleRole)) {
              member.addRole(doc.muzzleRole).catch(console.error);
            } else {
              member.removeRole(doc.muzzleRole).catch(console.error);
            }
          }
        }
      }
    })
  }
};
