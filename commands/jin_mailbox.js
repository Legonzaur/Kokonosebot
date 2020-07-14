const Discord = require("discord.js");
const imgur = require("../utils/imgur");
const dbHandler = require("../utils/dbHandler");

const command = {
  name: "jin",
  description: "Jin's mailbox",
  async execute(msg, args) {
    // uses a regex to test if string have "@jin" or "@sidu", case insensitive
    // (gmi).
    var regex = /@jin|@sidu/gmi;
    if (regex.test(msg.content)){
      //insert msg into db
      sql.prepare("INSERT INTO jinSiduMsg (user, msg) VALUES (?,?)")
         .run(guildUtils.userNickname(client, msg), msg.content);
      //display a cool message~
      var embed = new Discord.MessageEmbed()
        .setAuthor("Jin et Sidu", "https://kagescan.legtux.org/kokonosebot/jin.png")
        .setDescription("**Message sauvegardé rien que pour Jin et les auteurs de kagepro**\n"+msg.content)
        .setColor(guildUtils.userToMember(client, msg).displayHexColor);
      msg.channel.send(embed);
    }
  }
};
module.exports = command;
