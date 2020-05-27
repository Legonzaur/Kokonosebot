require("dotenv").config();
const { CommandoClient } = require("discord.js-commando");
const path = require("path");
const client = new CommandoClient({
  commandPrefix: "$",
  owner: "268494575780233216",
  unknownCommandResponse: false,
});

const albums = ["blush", "chut", "cry", "handhold", "pat", "hug"];

const ImagesCommand = require("./customCommands/images");
const images = new ImagesCommand(client);

const imgur = require("./utils/imgur");
imgur.registerImages(albums).then((value) => {
  images.registerAlbums(value);
});

client.registry
  .registerDefaultTypes()
  //   .registerGroups([["images", "Provides you cute images of Kagepro members"]])
  .registerDefaultGroups()
  .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  //   client.user.setActivity("with Commando");
});

client.on("message", (msg) => {
  if (msg.content.startsWith(client.commandPrefix)) {
    msg.arguments = msg.content.substring(1).split(" ");
    msg.command = msg.arguments.shift();
    if (albums.includes(msg.command)) {
      images.postRandomImage(msg);
    }
  }
});
client.on("error", console.error);

client.login(process.env.DISCORD_TOKEN);
