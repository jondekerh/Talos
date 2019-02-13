module.exports.set = (msg, msgArr) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    daysInt = parseInt(msgArr[2]) * 86400000;
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {days: daysInt}, (err, guild) => {
      if (err) {
        console.log(err);
        msg.channel.send('I don\'t recognize that value.')
          .then(msg => autoDelete.delete(msg));
      } else {
        msg.channel.send(`Days set to ${msgArr[2]}!`)
          .then(msg => autoDelete.delete(msg));
      }
    })
  }
};
