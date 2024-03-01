const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "bio",
    aliases: ["changebio"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 2,
    shortDescription: "change bot's bio",
    longDescription: "change bot's bio",
    category: "owner",
    guide: "{p}bio keywords"
  },

  onStart: async function ({ api, event, global, args, permssion, utils, client, Users }) {
    const permission = ["100008578069233"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("You don't have enough permission to use this command. Only Samir B. Thakuri can do it.", event.threadID, event.messageID);
    return;
  }
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("An error occurred" + e, event.threadID); return api.sendMessage("Changed bot's bio to :\n"+args.join(" "), event.threadID, event.messgaeID)})
  }
  };
