const axios = require("axios");
const fs = require("fs");
module.exports = {
  config: {
    name: "groupname",
    aliases: ['gcname', 'boxname'],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 1,
    shortDescription: "groupimg",
    longDescription: "groupimg",
    category: "box chat",
  }, 
  onStart: async function({api, event, args}) {
    var name = args.join(" ")
	if (!name) api.sendMessage("❌ You have not entered the group name you want to change", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 The bot changed the group name to: ${name}`, event.threadID, event.messageID));
  }
};
