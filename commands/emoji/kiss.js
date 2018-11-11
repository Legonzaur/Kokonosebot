const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            group: 'emoji',
            memberName: 'kiss',
            description: 'kiss someone ! ( ˶˘ ³˘(˵ ͡° ͜ʖ ͡°˵)♡',
            examples: ['kiss'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to kiss?',
                    type: 'user',
                    default: 0
                }
            ]
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'kiss', msg.author, user);
    }
};