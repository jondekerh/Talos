module.exports.message = (msg, callout) => {
  msg.channel.send(`\`${callout} setup\` - shows commands for setting me up on a new server.\n\`${callout} muzzle @[user]\` - puts the muzzle (server mute) role on a user. Use the command a second time to remove it.\n\`${callout} kick @[user]\` - kicks a user from the server.\n\`${callout} ban @[user]\` - bans a user from the server.`);
}
