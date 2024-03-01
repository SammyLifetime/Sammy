const axios = require("axios");

module.exports = {
  config: {
    name: "multiply",
    version: "1.1",
    author: "Samuel Kâñèñgeè",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "Premium",
    guide: ""
  },

  onStart: async function ({ event, message, getLang, threadsData, api, args }) {
    let num = parseInt(args[0]);

    if (isNaN(num)) {
      return api.sendMessage("Invalid number. Please enter a valid number.", event.threadID);
    }

    let result = "";
    for (let i = 1; i <= 10; i++) {
      result += `${num} x ${i} = ${num * i}\n`;
    }

    api.sendMessage(result, event.threadID);
  }
};