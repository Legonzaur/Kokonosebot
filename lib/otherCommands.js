const { RichEmbed } = require('discord.js');
const guildUtils = require('./guildUtils.js');
const libDB = require('./db.js');
module.exports = {
    writeEmoji,
    jinAndSidu
};

function writeEmoji(client, msg){
  //if user disabled this command
    if(libDB.getPreferencies(msg.author.id, msg.guild.id) && libDB.getPreferencies(msg.author.id, msg.guild.id).customEmoji == 'FALSE')
        return;
  //if the message's text matches emoji list
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

function jinAndSidu(client, msg){
  var regex = /@jin|@sidu/gmi;
  if (regex.test(msg.content)){
    var embed = new RichEmbed()
      .setAuthor("Jin et Sidu", "https://kagescan.legtux.org/kokonosebot/jin.png")
      .setDescription("**Message sauvegardé rien que pour Jin et Sidu**\n"+msg.content)
      .setColor(guildUtils.userToMember(client, msg).displayHexColor);
    msg.channel.send(embed);
  }
  return;
}