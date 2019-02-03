module.exports.set = (msg) => {
  const mongoose = require('mongoose');
  var Guild = require('./../schemas/guildSchema.js');

  Guild.findOneAndUpdate({guildID: msg.guild.id}, {rulesChannel: msg.channel.id}, (err, guild) => {
    if (err) {
      console.log(err);
    }
  })
};
