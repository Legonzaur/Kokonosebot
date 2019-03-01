const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'hug',
        group: 'emoji',
        memberName: 'hug',
        description: 'Hug someone !(つ ♥ ͜ʖ ♥)つ',
        examples: ['hug'],
        argsPromptLimit: 0,
        args: [
          {
            key: 'user',
            prompt: 'Which user would you like to hug?',
            type: 'user',
            default: 0
          }
        ]
      });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'hug', msg.author, user);
    }
};