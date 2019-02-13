module.exports.set = (msg, msgArr) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./autoDelete.js');
  var Guild = require('./../schemas/guildSchema.js');

  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    postsInt = parseInt(msgArr[2]);
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {posts: postsInt}, (err, guild) => {
      if (err) {
        console.log(err);
        msg.channel.send('I don\'t recognize that value.')
          .then(msg => autoDelete.delete(msg));
      } else {
        msg.channel.send(`Posts set to ${postsInt}!`)
          .then(msg => autoDelete.delete(msg));
      }
    })
  }
};
