module.exports.set = (msg, roleName) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    try {
      Guild.findOneAndUpdate({guildID: msg.guild.id}, {startingRole: msg.guild.roles.find(role => role.name === roleName).id}, (err, guild) => {
      if (err) {
        console.log(err);
        msg.channel.send('Role not found. Be aware roles are case-sensitive.')
          .then(msg => autoDelete.delete(msg));
      } else {
        msg.channel.send('Starting role set!')
          .then(msg => autoDelete.delete(msg));
        }
      })
    } catch(err) {
      console.log(err);
      msg.channel.send('Role not found. Be aware roles are case-sensitive.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};
