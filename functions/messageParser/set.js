const mongoose = require('mongoose');
const autoDelete = require('./autoDelete.js');
var Guild = require('./../schemas/guildSchema.js');

//cooldown
module.exports.cooldown = (msg, msgArr) => {
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

//posts
module.exports.posts = (msg, msgArr) => {
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

//days
module.exports.days = (msg, msgArr) => {
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

//bot channel
module.exports.botChannel = (msg) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {botChannel: msg.channel.id}, (err, guild) => {
      if (err) {
        console.log(err);
      } else {
        msg.channel.send('Bot channel set!')
          .then(msg => autoDelete.delete(msg));
      }
    })
  }
};

//greeting channel
module.exports.greetingChannel = (msg) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    Guild.findOneAndUpdate({guildID: msg.guild.id}, {greetingChannel: msg.channel.id}, (err, guild) => {
      if (err) {
        console.log(err);
      } else {
        msg.channel.send('Greeting channel set!')
          .then(msg => autoDelete.delete(msg));
      }
    })
  }
};

//rules channel
module.exports.rulesChannel = (msg) => {
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

//starting role
module.exports.startingRole = (msg, msgArr) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    try {
      Guild.findOneAndUpdate({guildID: msg.guild.id}, {startingRole: msg.guild.roles.find(role => role.name === msgArr[2]).id}, (err, guild) => {
        msg.channel.send('Starting role set!')
          .then(msg => autoDelete.delete(msg));
      })
    } catch(err) {
      console.log(err);
      msg.channel.send('Role not found. Be aware roles are case-sensitive.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};

//granted role
module.exports.grantedRole = (msg, msgArr) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    try {
      Guild.findOneAndUpdate({guildID: msg.guild.id}, {grantedRole: msg.guild.roles.find(role => role.name === msgArr[2]).id}, (err, guild) => {
        msg.channel.send('Granted role set!')
          .then(msg => autoDelete.delete(msg));
      })
    } catch(err) {
      console.log(err);
      msg.channel.send('Role not found. Be aware roles are case-sensitive.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};
