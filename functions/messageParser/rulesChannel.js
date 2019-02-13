module.exports.set = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {rulesChannel: msg.channel.id}, (err, guild) => {
      if (err) {
        console.log(err);
      } else {
        msg.channel.send('Rules channel set!')
          .then(msg => autoDelete.delete(msg));
      }
    })  
  }
};
