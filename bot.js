const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const messageParser = require('./functions/messageParser.js');
const mongoServer = require('./functions/mongoServer.js');
const memberDoc = require('./functions/memberDoc.js');
const massCooldown = require('./functions/massCooldown.js')
var Guild = require('./functions/schemas/guildSchema.js');

//the char or string to be placed before commands. default is "T"
var callout = 'T';

//startup message & db connection & cooldown reset
client.on('ready', () => {
  console.log(`${client.user.tag} is ready to serve!`);
  mongoServer.connect();
  massCooldown.reset();
  client.user.setActivity('T help');
});

//automatic disboard bumping, interval is +5 seconds just in case disboard is slow to update
client.setInterval(() => {
  client.guilds.forEach(function(guild) {
    Guild.findOne({guildID: guild.id}, (err, doc) => {
      if (err) {
        console.log(error);
      } else {
        if (doc.botChannel) {
          client.channels.get(doc.botChannel).send('!disboard bump')
          .catch(err => console.log(err));
        }
      }
    })
  })
}, 5405000);

//server greeting and automatic role assignment
client.on('guildMemberAdd', member => {
  Guild.findOne({guildID: member.guild.id}, (err, doc) => {
    if (err) {
      console.log(error);
    } else {
      if (doc.startingRole) {
        let role = member.guild.roles.find(role => role.id === doc.startingRole);
        member.addRole(role).catch(console.error);
      }
      if (doc.greetingChannel && doc.rulesChannel) {
        client.channels.get(doc.greetingChannel).send(`Greetings ${member}, and welcome to Olympus! Be sure to read the ' + client.channels.get(doc.rulesChannel) + ' before posting, and if you have any questions feel free to message an Olympian or Hero.')
        .catch(err => console.log(err));
      }
    }
  })
});

//master parser that handles all commands in messageParser.js
client.on('message', (msg) => {
  messageParser.parse(msg, callout);
  memberDoc.update(msg);
});


client.login(auth.token);
