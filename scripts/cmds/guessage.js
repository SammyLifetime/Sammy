const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "guessage",
    aliases: ["ageguess"],
    version: "1.0",
    author: "Samir",
    countDown: 0,
    role: 0,
    shortDescription: "Guess age by replying to 1 photo",
    longDescription: "Guess age by replying to 1 photo",
    category: "ai",
    guide: "{pn} [reply to image]"
  },

  onStart: async function ({ api, event }) {
    if (event.type !== "message_reply") {
      return api.sendMessage("⚡️ You have to reply to a certain photo to guess the age", event.threadID, event.messageID);
    }
    if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage("🥲 You have to reply to a certain photo to guess the age", event.threadID, event.messageID);
    }
    if (event.messageReply.attachments.length > 1) {
      return api.sendMessage("🥲 Please reply with only one photo!", event.threadID, event.messageID);
    }

    const options = {
      method: 'POST',
      url: 'https://microsoft-face1.p.rapidapi.com/detect',
      params: {
        returnFaceAttributes: 'age',
        detectionModel: 'detection_01',
        recognitionModel: 'recognition_01',
        returnFaceId: 'true'
      },
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'microsoft-face1.p.rapidapi.com',
        'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0'
      },
      data: {
        url: event.messageReply.attachments[0].url
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data[0];
      const age = data.faceAttributes.age;
      return api.sendMessage(`🥲 Bot guesses this person is  about ${age} years old`, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage("❌ Unable to process your request!!!", event.threadID, event.messageID);
    }
  }
};
