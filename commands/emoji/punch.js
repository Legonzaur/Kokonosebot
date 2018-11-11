const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'punch',
            group: 'emoji',
            memberName: 'punch',
            description: 'punch someone ! (∩ ͡° ͜ʖ ͡°)⊃━☆─=≡Σ((( つ◕ل͜◕)つ',
            examples: ['punch'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to punch?',
                    type: 'user',
                    default: 0
                }
            ]
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'punch', msg.author, user);        
    }
};