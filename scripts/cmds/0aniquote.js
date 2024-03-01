const axios = require("axios");

module.exports = {
  config: {
    name: "aniquote",
    version: "1.0",
    author: "samir",
    countDown: 5,
    role: 0,
    shortDescription: "Get anime quotes",
    longDescription: {
      en: "get quotes."
    },
    category: "anime",
    guide: {
      en: "{pn} or {pn} <animeName>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      let query = ""; 
      if (args.length > 0) {
        query = args.join(" ");
      }

      const response = await axios.get(`https://api.samir-dev.repl.co/data/quote?anime=${query}`);

      const messageText = `From: ${response.data.anime}\n\nQuote: ${response.data.quote}\n\nBy: ${response.data.character}`;
      return api.sendMessage(messageText, event.threadID);
    } catch (error) {
      console.error(error);
    }
  }
};
      