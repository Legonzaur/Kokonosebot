const Discord = require("discord.js");

class CustomCommand {
  constructor(client) {
    this.client = client;
  }
}

class images extends CustomCommand {
  registerAlbums(data) {
    this.albums = data;
  }
  __getRandomImage(album) {
    let array = this.albums[album];
    let index = Math.floor(array.length * Math.random());
    return array[index];
  }

  postRandomImage(msg) {
    var image = this.__getRandomImage(msg.command);
    var embed = new Discord.MessageEmbed().setImage(image.link);
    msg.channel.send(embed);
  }
}
module.exports = images;
