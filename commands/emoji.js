const Discord = require("discord.js");
const imgur = require("../utils/imgur");
const dbHandler = require("../utils/dbHandler");

const command = {
  name: "emoji",
  description: "Top 10 emojis ever. or?",
  async execute(msg, args) {
    try {
      var emojiGuild = await dbHandler.getTopEmojiGuild(msg.guild.id);
    } catch (e) {
      throw new Error(e);
    }

    var embed = new Discord.MessageEmbed()
      .setTitle(msg.guild.name)
      .setDescription("Top 10 emojis du serveur " + msg.guild.name);
    for (let i = 0; i < 10; i++) {
      if (emojiGuild.sorted[i]) {
        let currentEmoji = emojiGuild.emojis[emojiGuild.sorted[i]];
        let topUser = currentEmoji.guildMembers.sorted[0];
        embed.addField(
          `<:aze:${emojiGuild.sorted[i]}>** : ${currentEmoji.total}**`,
          `${(await msg.guild.members.fetch(topUser)).displayName} : ${
            currentEmoji.guildMembers[topUser]
          }`
        );
      }
    }
    msg.channel.send(embed);
  },
};
module.exports = command;
