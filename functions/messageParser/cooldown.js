module.exports.set = (msg, msgArr) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    cdInt = parseInt(msgArr[2]) * 1000;
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {cooldown: cdInt}, (err, guild) => {
      if (err) {
        console.log(err);
        msg.channel.send('I don\'t recognize that value.')
          .then(msg => autoDelete.delete(msg));
      } else {
        msg.channel.send(`Cooldown set to ${msgArr[2]} seconds!`)
          .then(msg => autoDelete.delete(msg));
      }
    })
  }
};
