const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'control',
      group: 'bot',
      memberName: 'control',
      description: 'shutdown the bot',
      examples: ['control stop'],
      guildOnly: true,
      args: [{
        key: 'action',
        prompt: 'Action ( stop)',
        type: 'string'
      }]
    });    
  }

  run(msg, { action }) {
    if (this.client.isOwner(msg.author)){
      switch (action){
      case 'stop':
        msg.channel.send('Goodbye~').then(msg => this.client.destroy());
        break;
      default:
        msg.channel.send("Wrong action. Use `stop`.");
      }
    } else
      msg.channel.send("You don't have the permission to use this command.");
  }
};