const { Command } = require('discord.js-commando');

const libDB = require('../../lib/db.js');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'on',
            group: 'emoji',
            memberName: 'on',
            description: 'Enables custom emojis',
            examples: ['on']
        });
    }

    run(msg) {
        let preferency = libDB.getPreferencies(msg.author.id, msg.guild.id);
        if(!preferency){
            preferency = {
                id: `${msg.guild.id}-${msg.author.id}`,
                user: msg.author.id,
                guild: msg.guild.id,
                customEmoji: "TRUE",
            }
        }
        preferency.customEmoji = "TRUE";
        libDB.setPreferencies(preferency)
        return;
    }
};