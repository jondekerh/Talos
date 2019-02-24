const help = require('./messageParser/help.js');
const init = require('./messageParser/init.js');
const set = require('./messageParser/set.js');
const mod = require('./messageParser/moderation.js');
const autoDelete = require('./messageParser/autoDelete.js');


module.exports.parse = (msg, callout) => {
  if (msg.content.startsWith(callout)) {
    //create array so commands can be directed via switch
    var msgArr = msg.content.split(' ');

    //master switch for bot commands
    switch (msgArr[1]) {
      //say hi
      case ('hello'):
        msg.channel.send('Hello!');
      break;
      //help command
      case ('help'):
        help.message(msg, callout);
      break;
      //initialize guild doc in DB
      case ('init'):
        init.initialize(msg);
      break;
      //sets cooldown on post credit
      case ('set-cooldown'):
        set.cooldown(msg, msgArr);
      break;
      //sets posts to advance to granted role
      case ('set-posts'):
        set.posts(msg, msgArr);
      break;
      //sets days user must be in the server for granted role
      case ('set-days'):
        set.days(msg, msgArr);
      break;
      //set bot command channel
      case ('bot-channel'):
        set.channel(msg, msgArr, 'botChannel');
      break;
      //set greeting channel
      case ('greeting-channel'):
        set.channel(msg, msgArr, 'greetingChannel');
      break;
      //set rules channel
      case ('rules-channel'):
        set.channel(msg, msgArr, 'rulesChannel');
      break;
      //set role to give members on join
      case ('starting-role'):
        set.role(msg, msgArr, 'startingRole');
      break;
      //set role to be granted after activity
      case ('granted-role'):
        set.role(msg, msgArr, 'grantedRole');
      break;
      //set role for muzzle
      case ('muzzle-role'):
        set.role(msg, msgArr, 'muzzleRole');
      break;
      //muzzle command
      case ('muzzle'):
        mod.muzzle(msg);
      break;
      //kick command
      case ('kick'):
        mod.kick(msg);
      break;
      //ban command
      case ('ban'):
        mod.ban(msg);
      break;
    };
  }
};
