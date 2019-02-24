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
        } else {
          msg.channel.send('You didn\'t mention a user.')
            .then(msg => autoDelete.delete(msg));
        }
      }
    })
  }
};

//kick
module.exports.kick = (msg) => {
  if (!msg.member.hasPermission('KICK_MEMBERS')) {
    msg.channel.send('You don\'t have permission to use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    let user = msg.mentions.users.first();
    if (user) {
      let member = msg.guild.member(user);
      if (member) {
        member.kick('Bot kick.').then(() => {
          msg.channel.send(`Successfully kicked ${user.tag}!`);
        }).catch(err => {
          msg.channel.send('Unable to kick that member.')
            .then(msg => autoDelete.delete(msg));
          console.error(err);
        })
      }
    } else {
      msg.channel.send('You didn\'t mention a user.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};

//ban
module.exports.ban = (msg) => {
  if (!msg.member.hasPermission('BAN_MEMBERS')) {
    msg.channel.send('You don\'t have permission to use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    let user = msg.mentions.users.first();
    if (user) {
      let member = msg.guild.member(user);
      if (member) {
        member.ban({
          reason: 'Bot ban'
        }).then(() => {
          msg.channel.send(`Successfully banned ${user.tag}!`);
        }).catch(err => {
          msg.channel.send('Unable to ban that member.')
            .then(msg => autoDelete.delete(msg));
          console.error(err);
        })
      }
    } else {
      msg.channel.send('You didn\'t mention a user.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};
