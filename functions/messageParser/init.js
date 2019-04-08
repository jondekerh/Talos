const mongoose = require('mongoose');
const autoDelete = require('./autoDelete.js');
const guildDoc = require('./init/guildDoc.js');
var Guild = require('../schemas/guildSchema.js');

module.exports.initialize = (msg) => {
  //user must be an admin to run this command
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    //before invoking the guildDoc and allMemberDocs functions, make sure the guild isn't already
    //saved to avoid duplicate docs
    //(note: validation like this can also be found in guildSchema.js)
    Guild.find({guildID: msg.guild.id}, (err, docs) => {
      if (err) {
        console.log(err);
      } else if (docs.length) {
        msg.channel.send('Cannot initialize guild. This is likely because it has already been initialized.')
        .then(msg => autoDelete.delete(msg));
      } else {
        guildDoc.create(msg);
      }
    })
  }
};
