const mongoose = require('mongoose');
const autoDelete = require('./autoDelete.js');
const guildDoc = require('./init/guildDoc.js');
const allMemberDocs = require('./init/allMemberDocs.js');

module.exports.initialize = (msg) => {
  //user must be an admin to run this command
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can initialize the guild')
      .then(msg => autoDelete.delete(msg));
  } else {
    guildDoc.create(msg);
    allMemberDocs.create(msg);
  }
};
