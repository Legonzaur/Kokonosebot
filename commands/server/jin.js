const SQLite = require("better-sqlite3");
const sql = new SQLite('./db/userSettings.sqlite');
const {Command} = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'jin',
      group: 'server',
      memberName: 'jin',
      description: 'show and manage all messages who mention @jin or @sidu and saved by KokonoseBot',
      examples: ['jin', 'jin delete 1'],
      argsPromptLimit: 0,
      args: [
        {
          key: 'command',
          prompt: '(None): Show the page 1, `page` : show the page <x>, `delete` : (interactive) delete a message in the page <x>.',
          type: 'string',
          default: ""
        },
        {
          key: 'x',
          prompt: 'A page number',
          type: 'integer',
          default: 0
        }
      ]
    });
  }

  run(initMessage, {command, x}) {
    initMessage.channel.send("please wait...").then((msg)=>{
      //var init
      const iterEmotes = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯'];
      const max = sql.prepare("SELECT count(*) FROM jinSiduMsg").get()['count(*)'];
      if ( !Number.isInteger(x) || x*10>max) x=0;
      var embed = new RichEmbed()
        .setAuthor("Jin's and Sidu's letter box", "https://kagescan.legtux.org/kokonosebot/jin.png")
        .setFooter(`   --- Page ${x} of ${Math.trunc(max/10)} ---`);
      sql.prepare("SELECT _rowid_, user, msg FROM jinSiduMsg where _rowid_ >= ? and _rowid_<? ").all(x*10, (x+1)*10)
        .forEach((e,i)=>{ embed.addField(`${iterEmotes[i]}) #${e.rowid} From ${e.user}`,'\t'+e.msg); });

      if (command=="delete") embed.addField('Waiting your input','Use the reactions to delete a message or navigate');
      msg.edit(embed);

      const filter = m => (reaction, user) => user.id === initMessage.author.id;
      const collector = msg.createReactionCollector(filter, { time: 15000 });

      collector.on('collect', r => {
        console.log(`Collected ${r.content}`);
        collector.stop();
      });

      collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
      });

      (async function(){ //anonymous ascync function
        try {
          var limit = 9;
          if (x != 0) await msg.react('⬅');
          else limit=8;
          if (x != Math.trunc(max/10)) await msg.react('➡');
          else limit = max%10;

          if (command=="delete"){
            for (var i=0; i<=limit; i++)
              await msg.react(iterEmotes[i]);
          }
        } catch (error) {
          embed.addField('ERROR :','One of the emojis failed to react !');
          msg.edit(embed);
        }
      })();
    });
  }
};