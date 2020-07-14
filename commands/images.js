const Discord = require("discord.js");
const imgur = require("../utils/imgur");

const command = {
  name: "hug",
  description: "Sends a cute Kagepro picture",
  aliases: ["blush", "chut", "cry", "handhold", "pat"],
  execute(msg, args) {
    let commandName = msg.content
      .slice(this.client.prefix.length)
      .split(" ")[0];
    let randomImage = this.albums[commandName][
      Math.floor(this.albums[commandName].length * Math.random())
    ];
    let embed = new Discord.MessageEmbed().setImage(randomImage.link);
    msg.channel.send(embed);
  },
};

imgur.registerImages([command.aliases, command.name].flat()).then((value) => {
  command.albums = value;
});
module.exports = command;
