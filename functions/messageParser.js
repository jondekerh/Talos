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
        msg.channel.send('tbd');
      break;
      //say hi
      case ('hello'):
        msg.channel.send('sup dudr');
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
