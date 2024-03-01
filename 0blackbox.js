const axios = require("axios");

module.exports = {
  config: {
    name: "blackbox",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "Chatbot",
    longDescription: "Featuring AI chatbot by blackbox, Generates creative answer.",
    category: "ai",
    guide: {
      en: "{pn} <question>",
    },
  },

  onStart: async function ({ api, event, args }) {
    let txt = args.join(" ");
    try {
      if (!txt) {
        return api.sendMessage("❌ Missing input!", event.threadID, event.messageID);
      }
      const response = await axios.get(`https://api-samir.restfulapi.repl.co/ask?q=${encodeURIComponent(txt)}&apikey=samirey`);
      const result = response.data.message;
      api.sendMessage(result, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("Error", event.threadID, event.messageID);
    }
  },
};
