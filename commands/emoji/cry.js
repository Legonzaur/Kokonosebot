const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cry',
            group: 'emoji',
            memberName: 'cry',
            description: 'crys someone ',
            examples: ['cry'],
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'cry', msg.author, 0);
    }
};