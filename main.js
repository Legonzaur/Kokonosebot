
//init
const Commando = require('discord.js-commando');
const privateVars = require('./private.json');
const libOtherCommands = require('./lib/otherCommands.js');
const libDB = require('./lib/db.js');
const client = new Commando.Client({
  owner: privateVars.owner
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

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'preferencies';").get();
    if (!table['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE preferencies (id TEXT PRIMARY KEY, user TEXT, guild TEXT, customEmoji BOOLEAN);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_preferencies_id ON preferencies (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }
});
  
client.on('message', msg => {
  if(msg.author.bot || !msg.guild) //don't catch bot's messages
      return;

  //Emoji functions
  libOtherCommands.writeEmoji(client, msg);

  //jin and sidu mention functions
  libOtherCommands.jinAndSidu(client, msg);
  
});

client.on('error', msg => {
   console.log(msg);
});
client.login(privateVars.token);
