module.exports.create = (msg) => {
  const mongoose = require('mongoose');
  const autoDelete = require('./../autoDelete.js');
  var Guild = require('../../schemas/guildSchema.js');

  var msgGuild = msg.guild.id;

  var newGuild = new Guild({
    guildID: msgGuild,
    botChannel: undefined,
    greetingChannel: undefined,
    rulesChannel: undefined,
    posts: 400,
    days: 1209600000,
    cooldown: 60000
  });

  newGuild.save(err => {
    if (err) {
      msg.channel.send('Cannot initialize guild. This is likely because it has already been initialized.')
      .then(msg => autoDelete.delete(msg));
      return;
    } else {
      msg.channel.send('Guild initialized to the database!')
      .then(msg => autoDelete.delete(msg));
    }
  })
};
