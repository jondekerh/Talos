# Talos
A modular discord bot made for a Greek-themed server. Automatically grants full membership to trial members, a trial role to new members, has basic moderation commands, greets new users, and more soon to come!

# Installation
You must have [node.js](https://nodejs.org/en/) and [mongoDB](https://docs.mongodb.com/manual/installation/#tutorials) installed locally for this to run.

**Setup:**
This bot will never be shared to other servers, however you may use the code for your own bot.
```
$ git clone https://github.com/jondekerh/Talos.git
$ cd Talos
$ npm install
```
I recommend using [pm2](https://www.npmjs.com/package/pm2) to run both the bot and the instance of mongodb you'll need for it to work in your production server. You'll also need to make an auth.json file in the same directory as bot.js with your bots token in it. It should look like this:
```
{
"token": "YOUR-TOKEN-HERE"
}
```

**Running on the Server:**
Once the bot is running alongside your instance of mongoDB you'll need to use a few commands in your server to make it work. For more info on the following commands you may type `T help` in any channel while the bot is running. For any role assignments you must include the parenthesis in `([role])`. Use the grammatically correct and case-sensitive name of the role you want to assign. **The channel commands must be used in the channel you want to assign.**
```
T init
T starting-role ([role])
T granted-role ([role])
T greeting-channel
T rules-channel
T bot-channel
```
Some variables, like the number of posts a member needs to get the `granted-role` or the cooldown for a post to be credited, can be changed with additional commands found by typing `T-help` in the server. The default variables are `400` posts, `14` days, and a `60` second cooldown.

As long as these steps are performed on every server that you add *your* instance of the bot to it will function fully on all of them. With that being said, sharding is not implemented in any way - so expect errors if it's on too many servers.

# To Do
-[ ] Figure out how to test discord bots and add tests.
-[ ] Revamp this README to accommodate small changes made to many functions.
-[ ] Revamp help command to be more aesthetic.

# License
MIT
