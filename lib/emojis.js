const { RichEmbed } = require('discord.js');
const guildUtils = require('./guildUtils.js');
module.exports = {
    writeEmoji
};

function writeEmoji(client, msg){
    if(guildUtils.readEmojiList(client, '434283741775396864').find(emoji => emoji.name == msg.content)){
        msg.delete().then(() => {
            var embed = new RichEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setDescription(msg.content)
            msg.channel.send(embed);
        });
    }
    return;
}