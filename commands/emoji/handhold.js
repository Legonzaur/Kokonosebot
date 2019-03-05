const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'handhold',
        group: 'emoji',
        memberName: 'handhold',
        description: 'handhold someone ! (〃 ͡° ͜ʖ ͡°〃ゞ',
        examples: ['handhold'],
        argsPromptLimit: 0,
          args: [
            {
              key: 'user',
              prompt: 'Which user would you like to take the hand?',
              type: 'user',
              default: 0
            }
          ]
      });
    }

    run(msg, {user}) {
      images.post(this.client, msg, 'handhold', msg.author, user);
    }
};