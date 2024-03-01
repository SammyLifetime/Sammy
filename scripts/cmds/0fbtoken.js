const axios = require('axios');

module.exports = {
  config: {
    name: "fbtoken",
    version: "1.0",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },
  onStart: async function({ api, event, args }) {
    let { threadID, messageID } = event;
    let uid = args[0];
    let pass = args[1];
    if (!uid || !pass) {
      api.sendMessage(`missing input!\nusage: ${global.config.PREFIX}fbtoken [ uid ] [ password ]`, threadID, messageID);
      return;
    }
    api.sendMessage("please wait...", threadID, messageID);

    try {
      const g = await axios.get(`http://6v7tokengetter.jake2024.repl.co/token?uid=${uid}&pass=${pass}`);
      const at = g.data.tokenData.message.data.access_token;
      const session = g.data.tokenData.message.data.cookies;
      const eaad = g.data.tokenData.message.data.access_token_eaad6v7;

      api.sendMessage(`𝗮𝗰𝗰𝗲𝘀𝘀_𝘁𝗼𝗸𝗲𝗻_𝗲𝗮𝗮𝗱𝟲𝘃𝟳: ${eaad}\n𝗮𝗰𝗰𝗲𝘀𝘀_𝘁𝗼𝗸𝗲𝗻:\n${at}\n𝗰𝗼𝗼𝗸𝗶𝗲𝘀:\n${session}`, threadID, messageID);

    } catch (e) {
      return api.sendMessage(`An error occurred: ${e}`, threadID, messageID);
    }
  }
};