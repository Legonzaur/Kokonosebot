const { Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const guildUtils = require('../../lib/guildUtils.js');

const http = require('http');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            group: 'emoji',
            memberName: 'hug',
            description: 'Hugs someone (つ ♥ ͜ʖ ♥)つ',
            examples: ['hug'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user',
                    default: 0
                }
            ]
        });
    }

    run(msg, {user}) {
        if(user.id == msg.author.id){
            user = 0;
        }
        var from, to;
        if(user == 0){
            from = this.client.user.id;
            to = msg.author.id;
        }else{
            
            from = msg.author.id;
            to = user.id;
        }
        http.get('http://kagescan.legtux.org/api/pic.php?i=hug&noRedirect=true', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
            var embed = new RichEmbed()
            .setAuthor(`${guildUtils.userNickname(this.client, msg, from)} hugs ${guildUtils.userNickname(this.client, msg, to)}`, guildUtils.idToUser(this.client, msg, from).displayAvatarURL)
            .setImage(data)
            .setColor(guildUtils.userToMember(this.client, msg, from).displayHexColor);
            msg.channel.send(embed);
        }); 
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
        
    }
};