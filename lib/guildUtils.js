module.exports = {
    readEmojiList,
    userToMember,
    userNickname
};

function readEmojiList(client, serverID){
    return client.guilds.find(guild => guild.id == serverID).emojis;
}

function userToMember(client, msg){
    return client.guilds.find(guild => guild.id == msg.guild.id).members.find(member => member.id == msg.author.id);
}

function userNickname(client, msg){
    if(userToMember(client, msg).nickname){
        return userToMember(client, msg).nickname;
    }
    return msg.author.username;
}