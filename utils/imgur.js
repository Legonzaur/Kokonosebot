var https = require("https");

function getImages(album) {
  return new Promise((resolve, reject) => {
    var options = {
      hostname: "api.imgur.com",
      path: `/3/album/${album}/images`,
      headers: { Authorization: "Client-ID 236fd6c8d2f66ef" },
      method: "GET",
    };

    var req = https.request(options, function (res) {
      data = "";
      res.on("data", function (d) {
        data += d;
      });
      res.on("end", function () {
        resolve(JSON.parse(data).data);
      });
    });

    req.on("error", function (e) {
      reject(e);
    });

    req.end();
  });
}

async function registerImages(albums) {
  var object = {};
  var mapped = albums.map((e) => {
    return getImages(process.env[`IMGUR_${e.toUpperCase()}`]);
  });
  var values = await Promise.all(mapped);
  values.forEach((e, i) => {
    object[albums[i]] = e;
  });
  return object;
}
module.exports = { getImages, registerImages };
