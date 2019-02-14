module.exports.message = (msg, callout) => {
  msg.channel.send(`To get me fully working on your server type the following commands in this order:\n\n\`${callout} init\` - This command creates an entry for the server in my database.\n\`${callout} starting-role [role]\` - This tells me which role you want new members to have.\n\`${callout} granted-role [role]\` - This tells me which role you want regular contributers to have.\n\`${callout} greeting-channel\` - This tells me where to greet new members. Must be used in the desired channel.\n\`${callout} rules-channel\` - This tells me which channel to direct new members to for the rules. Must be used in the desired channel.\n\`${callout} bot-channel\` - This tells me where to interact with other bots. Must be used in the desired channel.\n\nOptional commands:\n\`${callout} set-posts [number]\` & \`${callout} set-days [number]\` - These change the default parameters for what constitutes a regular contributor.\n\`${callout} set-cooldown [number]\` - This changes the default cooldown in seconds for posts being credited.`);
};
