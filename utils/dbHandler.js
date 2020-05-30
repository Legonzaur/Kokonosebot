MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
function reducer(acc, val) {
  return val.count + acc;
}

class Emoji {
  constructor() {}
  guildMembers = [];
  get totalCount() {
    return this.guildMembers.reduce(reducer, 0);
  }
}

class DbHandler {
  constructor() {}
  incrementEmoji(emojiID, memberID, guildID) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, async (err, db) => {
        if (err) reject(err);
        var dbo = db.db("Kokonosebot");
        var emojiEntry = await this.createGuildEmojiStructure(
          guildID,
          dbo,
          emojiID,
          memberID
        );
        emojiEntry[emojiID].guildMembers[memberID]++;
        var newvalues = { $set: { emoji: emojiEntry } };
        dbo
          .collection("guild")
          .updateOne({ guildID: guildID }, newvalues, function (err, res) {
            if (err) reject(err);
            resolve();
            db.close();
          });
      });
    });
  }
  async createGuildEmojiStructure(guildID, dbo, emojiID, memberID) {
    var guildEntry = await dbo
      .collection("guild")
      .findOne({ guildID: guildID });
    if (!guildEntry) {
      await dbo.collection("guild").insertOne({ guildID: guildID, emoji: {} });
    }
    var emojiEntry = await dbo
      .collection("guild")
      .findOne({ guildID: guildID });
    emojiEntry = emojiEntry.emoji;
    if (!emojiEntry[emojiID]) {
      emojiEntry[emojiID] = { guildMembers: {} };
    }
    if (emojiEntry[emojiID].guildMembers[memberID] == null) {
      emojiEntry[emojiID].guildMembers[memberID] = 0;
    }
    return emojiEntry;
  }
  getTopEmojiGuild(guildID) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, async (err, db) => {
        if (err) reject(err);
        var dbo = db.db("Kokonosebot");
        var guildData = await dbo
          .collection("guild")
          .findOne({ guildID: guildID });
        var emojiList = guildData.emoji;

        //adds total
        for (let [emojiID, members] of Object.entries(emojiList)) {
          emojiList[emojiID].total = 0;
          //sorts membersID

          for (let [memberID, value] of Object.entries(members.guildMembers)) {
            console.log(value);
            emojiList[emojiID].total += value;
          }

          emojiList[emojiID].guildMembers.sorted = Object.keys(
            members.guildMembers
          ).sort(function (a, b) {
            return members.guildMembers[b] - members.guildMembers[a];
          });
        }

        //create sorted array of emoji IDs
        let keysSorted = Object.keys(emojiList).sort(function (a, b) {
          return emojiList[b].total - emojiList[a].total;
        });

        let output = { sorted: keysSorted, emojis: emojiList };

        //console.log(output);
        resolve(output);
      });
    });
  }
}

module.exports = new DbHandler();
