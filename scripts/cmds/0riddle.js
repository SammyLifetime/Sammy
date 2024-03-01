const axios = require('axios');

module.exports = {
  config: {
    name: "riddle",
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
    try {
      const res = await axios.get('https://riddles-api.vercel.app/random');
      const riddle = res.data.riddle;
      return api.sendMessage(riddle, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error fetching riddle:', error);
      return api.sendMessage('Error fetching riddle. Please try again later.', event.threadID);
    }
  }
};