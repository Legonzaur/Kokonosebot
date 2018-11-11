const { Command } = require('discord.js-commando');

const libDB = require('../../lib/db.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'off',
            group: 'emoji',
            memberName: 'off',
            description: 'Disables custom emojis',
            examples: ['off']
        });
    }

    run(msg) {
        let preferency = libDB.getPreferencies(msg.author.id, msg.guild.id);
        if(!preferency){
            preferency = {
                id: `${msg.guild.id}-${msg.author.id}`,
                user: msg.author.id,
                guild: msg.guild.id,
                customEmoji: "FALSE",
            }
        }
        preferency.customEmoji = "FALSE";
        libDB.setPreferencies(preferency);
        return;
    }
};