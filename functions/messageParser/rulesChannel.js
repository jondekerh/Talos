module.exports.set = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  Guild.findOneAndUpdate({guildID: msg.guild.id}, {rulesChannel: msg.channel.id}, (err, guild) => {
    if (err) {
      console.log(err);
    } else {
      msg.channel.send('Rules channel set!')
        .then(msg => autoDelete.delete(msg));
    }
  })
};
