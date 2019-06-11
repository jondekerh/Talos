const help = require('./messageParser/help.js');
const setup = require('./messageParser/setup.js');
const init = require('./messageParser/init.js');
const set = require('./messageParser/set.js');
const mod = require('./messageParser/moderation.js');
const autoDelete = require('./messageParser/autoDelete.js');


module.exports.parse = (msg, callout) => {
  //create array so commands can be directed via switch
  var msgArr = msg.content.split(' ');
  if (msgArr[0] == callout) {
    //master switch for bot commands (remember to make them all caps for case insensitivity)
    switch (msgArr[1].toUpperCase()) {
      //say hi
      case ('HELLO'):
        msg.channel.send('Hello!');
      break;
      //help command
      case ('HELP'):
        help.message(msg, callout);
      break;
      //setup command
      case ('SETUP'):
        setup.message(msg, callout);
      break;
      //initialize guild doc in DB
      case ('INIT'):
        init.initialize(msg);
      break;
      //sets cooldown on post credit
      case ('SET-COOLDOWN'):
        set.cooldown(msg, msgArr);
      break;
      //sets posts to advance to granted role
      case ('SET-POSTS'):
        set.posts(msg, msgArr);
      break;
      //sets days user must be in the server for granted role
      case ('SET-DAYS'):
        set.days(msg, msgArr);
      break;
      //set bot command channel
      case ('BOT-CHANNEL'):
        set.channel(msg, msgArr, 'botChannel');
      break;
      //set greeting channel
      case ('GREETING-CHANNEL'):
        set.channel(msg, msgArr, 'greetingChannel');
      break;
      //set rules channel
      case ('RULES-CHANNEL'):
        set.channel(msg, msgArr, 'rulesChannel');
      break;
      //set role to give members on join
      case ('STARTING-ROLE'):
        set.role(msg, msgArr, 'startingRole');
      break;
      //set role to be granted after activity
      case ('GRANTED-ROLE'):
        set.role(msg, msgArr, 'grantedRole');
      break;
      //set role for muzzle
      case ('MUZZLE-ROLE'):
        set.role(msg, msgArr, 'muzzleRole');
      break;
      //muzzle command
      case ('MUZZLE'):
        mod.muzzle(msg);
      break;
      //kick command
      case ('KICK'):
        mod.kick(msg);
      break;
      //ban command
      case ('BAN'):
        mod.ban(msg);
      break;
    };
  }
};
