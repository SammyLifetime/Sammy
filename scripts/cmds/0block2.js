const axios = require("axios");

module.exports = {
  config: {
    name: "block2",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function ({ api, event, args }) {
    if (args.join().includes('@')) {
      var id = Object.keys(event.mentions);
    } else {
      var id = args[1];
    }

    if (args.join().includes(".com/")) {
      const res = await axios.get(`https://api.reikomods.repl.co/sus/fuid?link=${args[1]}`);
      id = res.data.result || args[1];
    }

    if (!id) {
      return api.sendMessage(`『 Wrong format 』\nUsage: block [uid/fb link/mention] (to block user)\n${this.config.name} unblock [uid] (to unblock user)`, event.threadID, event.messageID);
    }
    
    if (!args[1]) {
      return api.sendMessage(`『 Wrong format 』\nUsage: block [uid] (to block user)\n${this.config.name} unblock [uid/fb link/mention] (to unblock user)`, event.threadID, event.messageID);
    }

    if (args[0] === "block") {
      api.changeBlockedStatus(id, true, (err) => {
        if (err) {
          return api.sendMessage(`${err}`, event.threadID, event.messageID);
        } else {
          return api.sendMessage("『 Successfully blocked user 』", event.threadID, event.messageID);
        }
      });
    } else if (args[0] === "unblock") {
      api.changeBlockedStatus(id, false, (err) => {
        if (err) {
          return api.sendMessage(`${err}`, event.threadID, event.messageID);
        } else {
          return api.sendMessage("『 Successfully unblocked user 』", event.threadID, event.messageID);
        }
      });
    }
  }
};