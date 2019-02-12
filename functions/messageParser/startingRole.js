module.exports.set = (msg, roleName) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  Guild.findOneAndUpdate({guildID: msg.guild.id}, {startingRole: msg.guild.roles.find(role => role.name === roleName).id}, (err, guild) => {
    if (err) {
      console.log(err);
      msg.channel.send('Role not found. Be aware roles are case-sensitive.');
    } else {
      msg.channel.send('Starting role set!')
        .then(msg => autoDelete.delete(msg));
    }
  })
};
