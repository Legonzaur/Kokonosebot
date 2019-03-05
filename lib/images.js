const { RichEmbed } = require('discord.js');
const guildUtils = require('./guildUtils');
const http = require('http');

module.exports = {
    post
};


function post(client, msg, type, user1, user2){
  var from, to;
  if(user2.id == user1.id)
    user2 = 0;  
  if(user2 == 0){
    from = client.user.id;
    to = user1.id;
  } else {
    from = user1.id;
    to = user2.id;
  }
  http.get(`http://kagescan.legtux.org/api/pic.php?i=${type}&noRedirect=true`, (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      if(type == "kiss"){
        type = "kisse"
      }
      if(type == "chut"){
        type = "shhe"
      }
      var embed = new RichEmbed()
      .setDescription(`**${guildUtils.userNickname(client, msg, from)}** ${type}s **${guildUtils.userNickname(client, msg, to)}**`)
      .setImage(data)
      .setColor(guildUtils.userToMember(client, msg, from).displayHexColor);

      if((type == "blush" || type == "cry")){
        if(type == "blush"){
          type = "blushes";
        }
        if(type == "cry"){
          type = "cries";
        }
      embed.setDescription(`**${guildUtils.userNickname(client, msg, to)}** ${type}`)
           .setColor(guildUtils.userToMember(client, msg, to).displayHexColor);
      }

      msg.channel.send(embed);
    }); 
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}