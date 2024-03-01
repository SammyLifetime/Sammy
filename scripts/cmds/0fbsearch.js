const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "fbsearch",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function({ event, api, global, Config, logger, Threads, Users, args, body, is }) {
    let type = args.join(" ");
    if (!type) return api.sendMessage("Please enter keywords", event.threadID, event.messageID);

    const login = (callback) => {
      const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
      callback(null, appState);
    };

    login((err, api) => {
      if (err) return console.error(err);

      api.getUserID(type, (err, data) => {
        if (err) return console.error(err);

        let message = "Found users with the same keyword!\n\n";
        data.forEach((user, index) => {
          message += `${index + 1}/${user.name}\nUID: ${user.userID}\nProfile Url: ${user.profileUrl}\n\n`;
        });

        api.sendMessage(message, event.threadID, event.messageID);
      });
    });
  }
};