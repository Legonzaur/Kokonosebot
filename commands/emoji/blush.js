const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'blush',
            group: 'emoji',
            memberName: 'blush',
            description: 'blushes ',
            examples: ['blush'],
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'blush', msg.author, 0);
    }
};