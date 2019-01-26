module.exports.parse = (msg, callout) => {
  const autoDelete = require('./autoDelete.js');
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
      //unknown command
      default:
        msg.channel.send('I don\'t understand your command. Type `T help` if you are confused.')
          .then(msg => autoDelete.delete(msg))
          .catch(console.error);
      break;
    };
  }
};
