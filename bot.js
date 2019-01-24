const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const request = require('request');
var callOut = "TALOS";


client.on('ready', () => {
  console.log(`${client.user.tag} is ready to serve!`);
});


client.login(auth.token);
