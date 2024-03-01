const axios = require('axios');

module.exports = {
  config: {
    name: "randomcolor",
    aliases: ["rdcolor"],
    version: "1.0",
    author: "Samir",
    countDown: 30,
    role: 0,
    shortDescription: "Get Random color info",
    longDescription: "Get Random color info",
    category: "study",
    guide: "{p}{n}"
  },

  onStart: async function ({ api, event, args }) {
    const res = await axios.get(`https://api.popcat.xyz/randomcolor`);
const message = {body:`❏Name: ${response.data.result.name}\n❏Hex: #${response.data.result.hex}\n❏Color Image:`,attachment:await global.utils.getStreamFromURL(response.data.result.image)};
 return api.sendMessage(message, event.threadID);
  }
};