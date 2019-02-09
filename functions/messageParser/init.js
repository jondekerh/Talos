const mongoose = require('mongoose');
const autoDelete = require('./autoDelete.js');
const guildDoc = require('./init/guildDoc.js');
const allMemberDocs = require('./init/allMemberDocs.js');
var Guild = require('../schemas/guildSchema.js');

module.exports.initialize = (msg) => {
  //user must be an admin to run this command
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can initialize the guild')
      .then(msg => autoDelete.delete(msg));
  } else {
    //before invoking the guildDoc and allMemberDocs functions, make sure the guild isn't already
    //saved to avoid duplicate docs
    //(does this make the validation in guildSchema.js irrevelant? figure out after release)
    Guild.find({guildID: msg.guild.id}, function(err, docs) {
      if (docs.length) {
        msg.channel.send('Cannot initialize guild. This is likely because it has already been initialized.')
        .then(msg => autoDelete.delete(msg));
      } else {
        guildDoc.create(msg);
        allMemberDocs.create(msg);
      }
    })
  }
};
