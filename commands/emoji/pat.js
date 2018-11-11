const { Command} = require('discord.js-commando');
const images = require('../../lib/images.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pat',
            group: 'emoji',
            memberName: 'pat',
            description: 'pat someone ! ✧･ﾟ: *✧･ﾟ♡*( ͡˘̴ ͜ ʖ̫ ͡˘̴ )*♡･ﾟ✧*:･ﾟ✧',
            examples: ['pat'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to pat?',
                    type: 'user',
                    default: 0
                }
            ]
        });
    }

    run(msg, {user}) {
        images.post(this.client, msg, 'pat', msg.author, user);  
    }
};