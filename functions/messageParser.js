const help = require('./messageParser/help.js');
const cooldown = require('./messageParser/cooldown.js');
const posts = require('./messageParser/posts.js');
const days = require('./messageParser/days.js');
const botChannel = require('./messageParser/botChannel.js');
const greetingChannel = require('./messageParser/greetingChannel.js');
const rulesChannel = require('./messageParser/rulesChannel.js');
const startingRole = require('./messageParser/startingRole.js');
const grantedRole = require('./messageParser/grantedRole.js');
const init = require('./messageParser/init.js');
const autoDelete = require('./messageParser/autoDelete.js');


module.exports.parse = (msg, callout) => {
  //if message was a bot command, handle it here
  if (msg.content.startsWith(callout)) {
    //create array so commands can be directed via switch
    var msgArr = msg.content.split(' ');

    switch (msgArr[1]) {
      //help command
      case ('help'):
        msg.channel.send(help.message);
      break;
      //say hi
      case ('hello'):
        msg.channel.send('Hello!');
      break;
      //sets cooldown on post credit
      case ('set-cooldown'):
        cooldown.set(msg, msgArr);
      break;
      //sets posts to advance to granted role
      case ('set-posts'):
        posts.set(msg, msgArr);
      break;
      //sets days user must be in the server for granted role
      case ('set-days'):
        days.set(msg, msgArr);
      break;
      //set bot command channel
      case ('bot-channel'):
        botChannel.set(msg);
      break;
      //set greeting channel
      case ('greeting-channel'):
        greetingChannel.set(msg);
      break;
      //set rules channel
      case ('rules-channel'):
        rulesChannel.set(msg);
      break;
      //set role to give members on join
      case ('starting-role'):
        startingRole.set(msg, msgArr[2]);
      break;
      //set role to be granted after activity
      case ('granted-role'):
        grantedRole.set(msg, msgArr[2]);
      break;
      //initialize guild doc in DB
      case ('init'):
        init.initialize(msg);
      break;
      //hanndle unknown commands
      default:
        msg.channel.send('I don\'t understand your command. Type `T help` if you are confused.')
          .then(msg => autoDelete.delete(msg));
      break;
    };
  }
};
