MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
function reducer(acc, val) {
  return val.count + acc;
}
const emoji = {
  guildMembers: [
    {
      id: null,
      count: 0,
    },
  ],
  get totalCount() {
    return this.guildMembers.reduce(reducer, 0);
  },
};

class DbHandler {
  constructor() {}
  incrementEmoji(id, user, guild) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Kokonosebot");
      console.log(bo.collection("guildEmojis").findOne({ id }));
      return;
      var guildObject = { emojis: {} };
      dbo.collection("guildEmojis").updateOne(myobj, function (err, res) {
        if (err) throw err;

        db.close();
      });
    });
  }
}
var handler = new DbHandler();
handler.incrementEmoji(
  "437634171943387182",
  "268494575780233216",
  "434283741775396864"
);
