const axios = require('axios');
module.exports = {
  config: {
    name: "thought",
    aliases: ["thoughts"],
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Get fact about animals",
      en: "Get fact about animals"
    },
    longDescription: {
      vi: "Get fact about animals",
      en: "Get fact about animals"
    },
    category: "Study",
  },

  onStart: async function ({ event, api, args }) {
const res = await axios.get(`https://api.popcat.xyz/showerthoughts`);
var result = res.data.result;
var author = res.data.author;
var upvotes = res.data.upvotes;
return api.sendMessage(`Author: ${author}\n\nThoughts: ${result}\n\n Total UpVotes: ${upvotes}`, event.threadID, event.messageID)
  }
};