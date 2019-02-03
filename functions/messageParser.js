const botChannel = require('./messageParser/botChannel.js');
const greetingChannel = require('./messageParser/greetingChannel.js');
const rulesChannel = require('./messageParser/rulesChannel.js');
const init = require('./messageParser/init.js');
const autoDelete = require('./messageParser/autoDelete.js');


module.exports.parse = (msg, callout) => {
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
