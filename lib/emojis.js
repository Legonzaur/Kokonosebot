const { RichEmbed } = require('discord.js');
const guildUtils = require('./guildUtils.js');
const libDB = require('./db.js');
module.exports = {
    writeEmoji
};

function writeEmoji(client, msg){
    if(libDB.getPreferencies(msg.author.id, msg.guild.id) && libDB.getPreferencies(msg.author.id, msg.guild.id).customEmoji == 'FALSE'){
        return;
    }
    if(guildUtils.readEmojiList(client, '434283741775396864').find(emoji => emoji.name == msg.content.toLowerCase())){
        msg.delete().then(() => {
            var embed = new RichEmbed()
            .setAuthor(guildUtils.userNickname(client, msg), msg.author.displayAvatarURL)
            .setDescription(msg.content)
            .setImage(guildUtils.readEmojiList(client, '434283741775396864').find(emoji => emoji.name == msg.content.toLowerCase()).url)
            .setColor(guildUtils.userToMember(client, msg).displayHexColor);
            msg.channel.send(embed);
        });
    }
    return;
}