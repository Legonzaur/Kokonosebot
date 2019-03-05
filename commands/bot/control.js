const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'control',
      group: 'bot',
      memberName: 'control',
      description: 'Restart or shutdown the bot',
      examples: ['control restart', 'control stop'],
      guildOnly: true,
      args: [{
        key: 'action',
        prompt: 'Action (restart or stop)',
        type: 'string'
      }]
    });    
  }

  run(msg, { action }) {
    if (this.client.isOwner(msg.author)){
      switch (action){
      case 'restart':
        const privateVars = require('../../private.json');
        msg.channel.send('Restarted~ (*if there were no error during the restart process*)')
        .then(msg => this.client.destroy())
        .then(() => this.client.login(privateVars.token));
        break;
      case 'stop':
        msg.channel.send('Goodbye~').then(msg => this.client.destroy());
        break;
      default:
        msg.channel.send("Wrong action. Use `restart` or `stop`.");
      }
    } else
      msg.channel.send("You don't have the permission to use this command.");
  }
};