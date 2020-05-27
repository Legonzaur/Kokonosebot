module.exports = {
    readEmojiList,
    userToMember,
    userNickname, 
    idToUser
};

function readEmojiList(client, serverID){
    return client.guilds.find(guild => guild.id == serverID).emojis;
}

function userToMember(client, msg, id){
    if(!id){
        id = msg.author.id;
    }
    return client.guilds.find(guild => guild.id == msg.guild.id).members.find(member => member.id == id);
}

function userNickname(client, msg, id){
   
    if(userToMember(client, msg, id).nickname){
        return userToMember(client, msg, id).nickname;
    }
    if(id){
        return client.users.find(user => user.id == id).username;
    }
    return msg.author.username;
}

function idToUser(client, msg, id){
    if(!id){
        id = msg.author.id;
    }
    return client.users.find(user => user.id == id)
}