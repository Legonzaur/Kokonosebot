require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const dbHandler = require("./utils/dbHandler");

const client = new Discord.Client();
client.prefix = process.env.DISCORD_PREFIX;

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  client.commands.get(command.name).client = client;
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
});

function handleEmojis(msg, emojis) {
  emojis = emojis.map((e) => e.match(/(?<=(\w):)\d+(?=>)/g)[0]);
  emojis.forEach((e) => {
    if (msg.guild.emojis.resolve(emojis[0])) {
      dbHandler.incrementEmoji(e, msg.author.id, msg.guild.id);
    }
  });
}

client.on("message", (msg) => {
  if (msg.author.bot) return;
  //Count emojis in msg
  var emojis = msg.content.match(/<:\w+:(\d+)>/g);
  if (emojis) handleEmojis(msg, emojis);

  if (!msg.content.startsWith(client.prefix)) return;
  const args = msg.content.slice(client.prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply(
      "Oops! Il y a une erreur! Un message a été envoyé à <@" +
        process.env.DISCORD_OWNER_ID +
        ">"
    );
    client.users.fetch(process.env.DISCORD_OWNER_ID).then((owner) => {
      owner.send("```js\n" + error + "```");
    });
  }
});

client.on("error", console.error);

client.login(process.env.DISCORD_TOKEN);
