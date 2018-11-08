const Commando = require('discord.js-commando');
const private = require('./private.json');
const lib = require('./lib/emojis.js');
const client = new Commando.Client({
    owner: '268494575780233216'
});
const path = require('path');
client.registry
    // Registers your custom command groups
    .registerGroups([
        ['emoji', 'Fun commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));
const sqlite = require('sqlite');
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);   
const SQLite = require("better-sqlite3");
const sql = new SQLite('./db/userSettings.sqlite');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', msg => {
      if(msg.author.bot){
          return;
      }
    lib.writeEmoji(client, msg);

  });

client.on('error', msg => {
   console.log(msg);
});
client.login(private.token);