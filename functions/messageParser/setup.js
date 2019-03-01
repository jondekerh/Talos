module.exports.message = (msg, callout) => {
  msg.channel.send(`To get me fully working on your server type the following commands in this order:\n\n\`${callout} init\` - This command creates an entry for the server in my database.\n\`${callout} starting-role ([role])\` & \`${callout} granted-role ([role])\` - These tells me which roles you want new members and regular contributers to have. You must include the parenthesis around the role name.\n\`${callout} greeting-channel #[channel]\` - This tells me where to greet new members. \n\`${callout} rules-channel #[channel]\` - This tells me which channel to direct new members to for the rules.\n\`${callout} bot-channel #[channel]\` - This tells me where to interact with other bots.\n\nOptional commands:\n\`${callout} set-posts [number]\` & \`${callout} set-days [number]\` - These change the default parameters for what constitutes a regular contributor.\n\`${callout} set-cooldown [number]\` - This changes the default cooldown in seconds for posts being credited.\n\`${callout} muzzle-role ([role])\` - This tells me which role to subdue members with using the muzzle command.`);
};
