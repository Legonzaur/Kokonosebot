const SQLite = require("better-sqlite3");
const sql = new SQLite('./db/userSettings.sqlite');

module.exports = {
    getPreferencies,
    setPreferencies
};
function getPreferencies(input1, input2){
    return sql.prepare("SELECT * FROM preferencies WHERE user = ? AND guild = ?").get(input1, input2);
} 
function setPreferencies(input){
    return sql.prepare("INSERT OR REPLACE INTO preferencies (id, user, guild, customEmoji) VALUES (@id, @user, @guild, @customEmoji);").run(input);
} 