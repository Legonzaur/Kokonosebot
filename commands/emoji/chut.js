const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'chut',
            group: 'emoji',
            memberName: 'chut',
            description: 'chuts someone ',
            examples: ['chut'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to shhhh?',
                    type: 'user',
                    default: 0
                }
            ]
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'chut', msg.author, user);
    }
};