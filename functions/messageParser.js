const help = require('./messageParser/help.js');
const setup = require('./messageParser/setup.js');
const init = require('./messageParser/init.js');
const set = require('./messageParser/set.js');
const mod = require('./messageParser/moderation.js');
const autoDelete = require('./messageParser/autoDelete.js');


module.exports.parse = (msg, callout) => {
  if (msg.content.startsWith(callout)) {
    //create array so commands can be directed via switch
    var msgArr = msg.content.split(' ');

    //master switch for bot commands
    switch (true) {
      //say hi
      case (/hello/i.test(msgArr[1])):
        msg.channel.send('Hello!');
      break;
      //help command
      case (/help/i.test(msgArr[1])):
        help.message(msg, callout);
      break;
      //setup command
      case (/setup/i.test(msgArr[1])):
        setup.message(msg, callout);
      break;
      //initialize guild doc in DB
      case (/init/i.test(msgArr[1])):
        init.initialize(msg);
      break;
      //sets cooldown on post credit
      case (/set-cooldown/i.test(msgArr[1])):
        set.cooldown(msg, msgArr);
      break;
      //sets posts to advance to granted role
      case (/set-posts/i.test(msgArr[1])):
        set.posts(msg, msgArr);
      break;
      //sets days user must be in the server for granted role
      case (/set-days/i.test(msgArr[1])):
        set.days(msg, msgArr);
      break;
      //set bot command channel
      case (/bot-channel/i.test(msgArr[1])):
        set.channel(msg, msgArr, 'botChannel');
      break;
      //set greeting channel
      case (/greeting-channel/i.test(msgArr[1])):
        set.channel(msg, msgArr, 'greetingChannel');
      break;
      //set rules channel
      case (/rules-channel/i.test(msgArr[1])):
        set.channel(msg, msgArr, 'rulesChannel');
      break;
      //set role to give members on join
      case (/starting-role/i.test(msgArr[1])):
        set.role(msg, msgArr, 'startingRole');
      break;
      //set role to be granted after activity
      case (/granted-role/i.test(msgArr[1])):
        set.role(msg, msgArr, 'grantedRole');
      break;
      //set role for muzzle
      case (/muzzle-role/i.test(msgArr[1])):
        set.role(msg, msgArr, 'muzzleRole');
      break;
      //muzzle command
      case (/muzzle/i.test(msgArr[1])):
        mod.muzzle(msg);
      break;
      //kick command
      case (/kick/i.test(msgArr[1])):
        mod.kick(msg);
      break;
      //ban command
      case (/ban/i.test(msgArr[1])):
        mod.ban(msg);
      break;
    };
  }
};
