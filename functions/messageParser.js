module.exports.parse = (msg, callout) => {
  //imports
  const autoDelete = require('./autoDelete.js');
  const botChannel = require('./botChannel.js');
  const greetingChannel = require('./greetingChannel.js');
  const init = require('./init.js');

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
        return msg.channel.id;
      break;
      //set greeting channel
      case ('greeting-channel'):
        return msg.channel.id;
      break;
      //initialize guild doc in DB
      case ('init'):
        init.initialize(msg);
      break;
      //hanndle unknown commands
      default:
        msg.channel.send('I don\'t understand your command. Type `T help` if you are confused.')
          .then(msg => autoDelete.delete(msg))
          .catch(console.error);
      break;
    };
  }
};
