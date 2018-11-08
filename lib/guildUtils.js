module.exports = {
    readEmojiList
};

function readEmojiList(client, serverID){
    return client.guilds.find(guild => guild.id == serverID).emojis;
}