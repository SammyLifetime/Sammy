const axios = require("axios");

module.exports = {
  config: {
    name: "inspiration",
    aliases: ["ins"],
    version: "1.0",
    author: "MILAN",
    countDown: 5,
    role: 0,
    shortDescription: "Get inspiration from legends",
    longDescription: {
      en: "get inspirational quotes."
    },
    category: "quote",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function({ api, event, args, message }) {
    try {
      const response = await axios.get(
        `https://milanbhandari.imageapi.repl.co/inspiration`,
        {
          params: {
            apikey: "xyzmilan"
          }
        }
      );
      const quoteMessage = {
        body: `⌜QUOTE⌟:\n\n${response.data.quote}\n\n⌜BY⌟: ${response.data.by}`,
        attachment: await global.utils.getStreamFromURL(response.data.link)
      };
      return api.sendMessage(quoteMessage, event.threadID);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred");
    }
  }
};