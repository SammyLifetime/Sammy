const axios = require('axios');

module.exports = {
  config: {
    name: "download2",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function({ api, event, client, Threads, args }) {
    const fs = global.nodemodule["fs-extra"];
    const rq = global.nodemodule["request"];

    let path, link;
    if (!args[1]) {
      path = __dirname + '';
      link = args.slice(0).join("");
    } else {
      path = __dirname + '/' + args[0];
      link = args.slice(1).join("");
    }

    const format = rq.get(link);
    const namefile = format.uri.pathname;
    path = path + '/' + (namefile.slice(namefile.lastIndexOf("/") + 1));

    const getimg = (await axios.get(link, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(getimg, "utf-8"));

    return api.sendMessage("Save the file to the folder " + path, event.threadID, event.messageID);
  }
};