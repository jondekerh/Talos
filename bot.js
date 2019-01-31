const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const request = require('request');
const messageParser = require('./functions/messageParser.js');

//the char or string to be placed before commands. default is "T"
var callout = 'T';

//channel ids to be stored for automated functions
//(note: these should probably be in a DB to keep them persistant between downtime)
var botChannel = undefined;
var greetingChannel = undefined;


client.on('ready', () => {
  console.log(`${client.user.tag} is ready to serve!`);
});

//automatic disboard bumping
client.setInterval(() => {
  client.channels.get('504887219585155076').send('!disboard bump');
}, 5400000);

//server greeting
client.on('guildMemberAdd', member => {
  client.channels.get('504887219585155076').send(`welcome ${member}, please read ` + client.channels.get('521199330556772352').toString());
});

//master parser that handles all commands in messageParser.js
client.on('message', msg => messageParser.parse(msg, callout));


client.login(auth.token);
