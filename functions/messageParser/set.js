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

//modular channel set
module.exports.channel = (msg, msgArr, field) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    try {
      let channelID = msg.mentions.channels.find(channel => channel).id;
      let channelName = msg.mentions.channels.find(channel => channel).name;
      Guild.findOneAndUpdate({guildID: msg.guild.id}, {[field]: channelID}, (err, guild) => {
        msg.channel.send(`${msgArr[1]} set to ${channelName}!`)
          .then(msg => autoDelete.delete(msg));
      })
    } catch (err) {
      console.log(err);
      msg.channel.send('Channel not found. Make sure you\'re tagging it with the pound symbol.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};

//modular role set
module.exports.role = (msg, msgArr, field) => {
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('Only an admin can use this command.')
      .then(msg => autoDelete.delete(msg));
  } else {
    try {
      let roleName = msg.content.replace( /(^.*\(|\).*$)/g, '' );
      Guild.findOneAndUpdate({guildID: msg.guild.id}, {[field]: msg.guild.roles.find(role => role.name === roleName).id}, (err, guild) => {
        msg.channel.send(`${msgArr[1]} set to ${roleName}!`)
          .then(msg => autoDelete.delete(msg));
      })
    } catch(err) {
      console.log(err);
      msg.channel.send('Role not found. Be aware roles are case-sensitive.')
        .then(msg => autoDelete.delete(msg));
    }
  }
};
