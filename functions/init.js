module.exports.initialize = (msg) => {
  var messageGuild = msg.guild.id;

  //user must be an admin to run this command
  if (!msg.member.hasPermission('ADMINISTRATOR')) {
    msg.channel.send('you are not admin');
  } else {
    //make the initial write for the doc. use doc.value = to assign stuff instead of obj template
  }
};
